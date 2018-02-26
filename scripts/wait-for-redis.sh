#!/bin/bash

until nc -z redis 6379; do
  >&2 echo "Redis is unavailable - sleeping"
  sleep 1
done

>&2 echo "-> Redis is up and running"
exec $cmd