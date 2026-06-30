INSERT INTO climbing_sessions (
  public_id,
  user_id,
  area_id,
  session_date,
  duration_minutes,
  notes
)
VALUES (
  'session-mampato-29062026',
  'raw',
  2,
  '2026-06-29',
  120,
  'Buena sesión. Mucho calor, pero mejoré la técnica de pies.'
);

INSERT INTO session_routes (
  session_id,
  route_id,
  attempts,
  status
)
VALUES (
  1,
  1,
  6,
  'project'
);
