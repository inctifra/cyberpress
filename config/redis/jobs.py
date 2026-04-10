import json
from .client import redis_client
from dataclasses import dataclass, field
import uuid
from faker import Faker

faker = Faker()


@dataclass
class FilePayload:
    url: str = faker.uri()


@dataclass
class JobPayload:
    id: str = field(default_factory=str(uuid.uuid4()))
    cafe_id: int = field(default_factory=123)
    file: FilePayload = field(default_factory=FilePayload)
    status: str = field(default_factory="completed")


def publish_job(job: JobPayload):
    event = {
        "job_id": job.id,
        "cafe_id": job.cafe_id,
        "file": job.file.url,
        "status": job.status,
    }

    redis_client.publish(f"jobs.cafe.{job.cafe_id}", json.dumps(event))
