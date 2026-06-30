CREATE TABLE IF NOT EXISTS climbing_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  area_id INTEGER NOT NULL,
  session_date TEXT NOT NULL,
  duration_minutes INTEGER,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(area_id) REFERENCES climbing_areas(id)
);

CREATE TABLE IF NOT EXISTS session_routes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  route_id INTEGER NOT NULL,
  attempts INTEGER DEFAULT 1,
  status TEXT NOT NULL,
  FOREIGN KEY(session_id) REFERENCES climbing_sessions(id),
  FOREIGN KEY(route_id) REFERENCES climbing_routes(id)
);
