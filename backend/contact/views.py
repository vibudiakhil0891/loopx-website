import os

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer


class ContactEnquiryAPIView(APIView):
    def post(self, request):
        serializer = ContactEnquirySerializer(data=request.data)

        if serializer.is_valid():
            enquiry = serializer.save()

            return Response(
                {
                    "success": True,
                    "message": "Thank you! Your enquiry has been received.",
                    "data": ContactEnquirySerializer(enquiry).data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "success": False,
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class OwnerEnquiryListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        enquiries = ContactEnquiry.objects.all().order_by("-created_at")

        serializer = ContactEnquirySerializer(
            enquiries,
            many=True,
        )

        return Response(
            {
                "success": True,
                "count": enquiries.count(),
                "data": serializer.data,
            }
        )


class OwnerEnquiryDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return ContactEnquiry.objects.get(pk=pk)
        except ContactEnquiry.DoesNotExist:
            return None

    def patch(self, request, pk):
        enquiry = self.get_object(pk)

        if enquiry is None:
            return Response(
                {
                    "success": False,
                    "message": "Enquiry not found.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ContactEnquirySerializer(
            enquiry,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "success": True,
                    "message": "Enquiry updated successfully.",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):
        enquiry = self.get_object(pk)

        if enquiry is None:
            return Response(
                {
                    "success": False,
                    "message": "Enquiry not found.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        enquiry.delete()

        return Response(
            {
                "success": True,
                "message": "Enquiry deleted successfully.",
            },
            status=status.HTTP_200_OK,
        )


class OwnerSetupAPIView(APIView):
    """
    Temporary protected endpoint for creating the production owner account.

    This endpoint should be removed immediately after the owner account
    has been created.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        setup_token = request.headers.get("X-Owner-Setup-Token")
        expected_token = os.environ.get("OWNER_SETUP_TOKEN")

        if not expected_token or setup_token != expected_token:
            return Response(
                {
                    "success": False,
                    "message": "Unauthorized.",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {
                    "success": False,
                    "message": "Username and password are required.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        User = get_user_model()

        if User.objects.filter(username=username).exists():
            return Response(
                {
                    "success": False,
                    "message": "Username already exists.",
                },
                status=status.HTTP_409_CONFLICT,
            )

        user = User.objects.create_superuser(
            username=username,
            email=email or "",
            password=password,
        )

        return Response(
            {
                "success": True,
                "message": "Owner account created successfully.",
                "username": user.username,
            },
            status=status.HTTP_201_CREATED,
        )