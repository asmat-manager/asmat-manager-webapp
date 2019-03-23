ALTER TABLE asmat
  ADD CONSTRAINT unique_name UNIQUE KEY (first_name, last_name);