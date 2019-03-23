ALTER TABLE asmat
  CHANGE phone_number cell_phone_number VARCHAR(20);

ALTER TABLE asmat
  ADD COLUMN fix_phone_number VARCHAR(20);