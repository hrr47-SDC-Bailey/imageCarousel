

echo ""
echo "Setting up \"Reviews\" Component for Steam FEC"
echo ""

echo ""
echo "  Working on correct/up-to-date branch"
git checkout master
git pull origin master

echo ""
echo "  Installing Dependencies"
npm i

echo ""
# echo "  Building Webpack"
# npm run-script react-dev

echo ""
echo "  Configuring database"
sqlExecute=$(<./server/database/schema.sql)
echo "  Enter Database Info"
read -p "Enter database username: " username
read -p "Enter database password: " password
# echo "mysql -u $username -p $password -e $sqlExecute"
mysql --user=$username --password=$password --execute="$sqlExecute"
echo "
  module.exports = {
    user: '$username',
    password: '$password',
    database: 'image_carousel',
    host: 'localhost',
  }
"
# > ./database/config.js
npm run seed
echo "Configuration Complete!"