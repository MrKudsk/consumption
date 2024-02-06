SELECT
  m."propertyId",
  m."categoryId",
  c.name AS category,
  date_trunc('month' :: text, m.date) AS yearmonth,
  sum(m.consumption) AS consumption
FROM
  (
    "Measurement" m
    JOIN "Category" c ON ((c.id = m."categoryId"))
  )
GROUP BY
  m."propertyId",
  m."categoryId",
  c.name,
  (date_trunc('month' :: text, m.date))
ORDER BY
  m."propertyId",
  m."categoryId",
  (date_trunc('month' :: text, m.date));