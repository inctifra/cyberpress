import redis

from config.settings.base import env

redis_client = redis.Redis(
    host="redis-15336.c281.us-east-1-2.ec2.cloud.redislabs.com",
    port=15336,
    username="default",
    password=env("DJANGO_REDIS_PASSWORD"),
    decode_responses=True,
)
