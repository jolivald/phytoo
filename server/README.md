# Strapi application

A quick description of your strapi application


# Full text search

## Create indexes

CREATE INDEX pgweb_idx ON pgweb USING GIN (to_tsvector(‘english’, body));

## Search indexes

Cette requête utilisera la configuration défini par “default_text_search_config”.
Un example plus complexe est de sélectionner les dix documents les plus récents qui contiennent les termes “create” et “table” dans les champs “title” ou “body”:

SELECT title
FROM pbweb
WHERE to_tsvector(title || ‘ ‘ || body) @@ to_tsquery(‘create & table’)
ORDER BT last_mod_date DESC
LIMIT 10;

SELECT * FROM plants WHERE to_tsvector(description || ' ' || usage  )
  @@ to_tsquery('term1 & term2');