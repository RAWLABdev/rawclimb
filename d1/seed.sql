INSERT INTO countries (public_id, name, code)
VALUES ('country-cl', 'Chile', 'CL');

INSERT INTO climbing_areas (
  public_id,
  country_id,
  name,
  description,
  image_path,
  latitude,
  longitude
)
VALUES
(
  'area-cajon-del-maipo',
  1,
  'Cajón del Maipo',
  'Uno de los sectores clásicos de escalada cerca de Santiago.',
  NULL,
  -33.598,
  -70.368
),
(
  'area-mampato',
  1,
  'Mampato',
  'Sector urbano asociado al boulder y entrenamiento técnico.',
  NULL,
  -33.402,
  -70.568
);

INSERT INTO climbing_zones (
  public_id,
  area_id,
  name,
  image_path
)
VALUES
(
  'zone-el-cubo',
  1,
  'El Cubo',
  NULL
),
(
  'zone-la-placa',
  1,
  'La Placa',
  NULL
);

INSERT INTO climbing_routes (
  public_id,
  zone_id,
  name,
  type,
  grade
)
VALUES
(
  'route-el-cubo-v4',
  1,
  'El Cubo',
  'boulder',
  'V4'
),
(
  'route-la-placa-v5',
  2,
  'La Placa',
  'boulder',
  'V5'
);
