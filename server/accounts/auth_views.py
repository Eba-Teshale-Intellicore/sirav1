from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class GoogleLoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        id_token = request.data.get("id_token")

        if not id_token:
            return Response(
                {"detail": "id_token is required."},
                status=400,
            )

        # Google token verification will go here.

        return Response({
            "message": "Google token received.",
        })