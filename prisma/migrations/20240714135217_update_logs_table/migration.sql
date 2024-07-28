-- Drop the foreign key constraint
ALTER TABLE Logs DROP FOREIGN KEY Logs_userId_fkey;

-- Drop the unique index
ALTER TABLE Logs DROP INDEX Logs_userId_key;

-- Recreate the foreign key constraint
ALTER TABLE Logs ADD CONSTRAINT Logs_userId_fkey FOREIGN KEY (userId) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE;
