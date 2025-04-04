#!/bin/bash

# Replace these with your actual MangaDex credentials
USERNAME="Afroski10"
PASSWORD="Plaza123"
CLIENT_ID="personal-client-7851f981-d488-4492-8ec5-dfd505d8e889-287c5ee4"
CLIENT_SECRET="zDLeeNKCiyhSlsKTVW8lXoIgS4AiniJ1"


echo "Requesting access token from MangaDex..."

curl -X POST "https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=password" \
     -d "username=${USERNAME}" \
     -d "password=${PASSWORD}" \
     -d "client_id=${CLIENT_ID}" \
     -d "client_secret=${CLIENT_SECRET}" \
     -w "\n"
