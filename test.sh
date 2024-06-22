if [ "$ENVIRONMENT" = "production" ]; then
  npm run start:production
elif [ "$ENVIRONMENT" = "production-e2e" ]; then
  npm run start:e2e
else
  npm run start
fi
