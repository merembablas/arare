
DB_NAME=arare

mongo $DB_NAME --eval "(function(){ db.items.drop(); db.accounts.drop(); db.itemhistories.drop(); })()"
