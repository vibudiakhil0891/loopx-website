from rest_framework import status
from rest_framework.permissions import IsAuthenticated
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
            many=True
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
            partial=True
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
    