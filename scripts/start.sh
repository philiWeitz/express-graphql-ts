
echo ""

if [ "$NODE_ENV" == "production" ]
then
    echo "Starting production server... (TODO)"
else
    echo "Starting debug server..."
    yarn migrate-db
    yarn seed-db
    yarn start-debug
fi