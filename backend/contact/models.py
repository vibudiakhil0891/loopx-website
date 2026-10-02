from django.db import models


class ContactEnquiry(models.Model):

    SERVICE_CHOICES = [
        ("Website", "Website"),
        ("Mobile App", "Mobile App"),
        ("Web Application", "Web Application"),
        ("E-commerce", "E-commerce"),
        ("Product Development", "Product Development"),
        ("Other", "Other"),
    ]

    STATUS_CHOICES = [
        ("New", "New"),
        ("Contacted", "Contacted"),
        ("Completed", "Completed"),
    ]

    name = models.CharField(max_length=100)

    email = models.EmailField()

    service = models.CharField(
        max_length=100,
        choices=SERVICE_CHOICES
    )

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="New"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.name} - {self.service}"