from django.urls import path

from .views import (
    ContactEnquiryAPIView,
    OwnerEnquiryListAPIView,
    OwnerEnquiryDetailAPIView,
    OwnerSetupAPIView,
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
    path(
        "owner/setup/",
        OwnerSetupAPIView.as_view(),
        name="owner-setup",
    ),
]