from django.urls import path

from .views import (
    ContactEnquiryAPIView,
    OwnerEnquiryDetailAPIView,
    OwnerEnquiryListAPIView,
)


urlpatterns = [
    path(
        "contact/",
        ContactEnquiryAPIView.as_view(),
        name="contact-enquiry",
    ),

    path(
        "owner/enquiries/",
        OwnerEnquiryListAPIView.as_view(),
        name="owner-enquiries",
    ),

    path(
        "owner/enquiries/<int:pk>/",
        OwnerEnquiryDetailAPIView.as_view(),
        name="owner-enquiry-detail",
    ),
]