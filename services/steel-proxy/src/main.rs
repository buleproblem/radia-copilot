use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::{
        sse::{Event, Sse},
        IntoResponse, Redirect, Response,
    },
    routing::get,
    Json, Router,
};
use serde_json::json;
use std::{
    collections::HashMap,
    convert::Infallible,
    net::SocketAddr,
    sync::{Arc, RwLock},
    time::Duration,
};
use tokio_stream::wrappers::IntervalStream;
use tokio_stream::StreamExt;
use tower_http::cors::CorsLayer;
use tracing::info;

type StreamMap = Arc<RwLock<HashMap<String, String>>>;

#[derive(Clone)]
struct AppState {
    streams: StreamMap,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "steel_proxy=debug,tower_http=debug".into()),
        )
        .init();

    let state = AppState {
        streams: Arc::new(RwLock::new(HashMap::new())),
    };

    let app = Router::new()
        .route("/health", get(health))
        .route("/stream/:station_id", get(stream_handler))
        .route("/sse/presence/:station_id", get(sse_presence))
        .route("/meta/:station_id", get(meta_handler))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    info!("steel-proxy listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn health() -> Json<serde_json::Value> {
    Json(json!({"status": "ok", "service": "steel-proxy"}))
}

async fn stream_handler(
    Path(station_id): Path<String>,
    State(state): State<AppState>,
) -> Response {
    // Check if a stream already exists for this station (coalescing)
    {
        let streams = match state.streams.read() {
            Ok(guard) => guard,
            Err(_) => return StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        };
        if let Some(upstream_url) = streams.get(&station_id) {
            info!("Coalescing stream for station {}", station_id);
            return Redirect::temporary(upstream_url).into_response();
        }
    }

    // Resolve upstream URL (mock: build a typical icecast URL pattern)
    let upstream_url = format!("http://stream.example.com/{}/stream", station_id);

    {
        match state.streams.write() {
            Ok(mut guard) => guard.insert(station_id.clone(), upstream_url.clone()),
            Err(_) => return StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        };
    }

    // Evict the entry after 60 seconds to avoid stale entries
    let streams_clone = state.streams.clone();
    let station_clone = station_id.clone();
    tokio::spawn(async move {
        tokio::time::sleep(Duration::from_secs(60)).await;
        if let Ok(mut guard) = streams_clone.write() {
            guard.remove(&station_clone);
        }
    });

    info!("Redirecting new stream for station {}", station_id);
    Redirect::temporary(&upstream_url).into_response()
}

async fn sse_presence(
    Path(station_id): Path<String>,
) -> Sse<impl tokio_stream::Stream<Item = Result<Event, Infallible>>> {
    let stream = IntervalStream::new(tokio::time::interval(Duration::from_secs(30))).map(
        move |_| {
            let data = json!({"station_id": station_id, "listeners": 0}).to_string();
            Ok::<Event, Infallible>(Event::default().data(data))
        },
    );

    Sse::new(stream).keep_alive(
        axum::response::sse::KeepAlive::new()
            .interval(Duration::from_secs(15))
            .text("heartbeat"),
    )
}

async fn meta_handler(
    Path(station_id): Path<String>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    info!("Meta request for station {}", station_id);
    Ok(Json(json!({
        "station_id": station_id,
        "title": "Unknown Title",
        "artist": "Unknown Artist",
        "album": "Unknown Album",
        "bitrate": 128,
        "format": "mp3"
    })))
}

