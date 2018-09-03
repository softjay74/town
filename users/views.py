from django.shortcuts import render
from . import serializers
from . import models
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class ProfileView(APIView) :
    

    def get(self, request, username, format=None) :
        
        user=request.user

        if ( str(user) == username ) : # 요청한 사람과 로그인 한 사람이 같은 경우 진행 
            try :
                UserInfo=models.User.objects.get(username=username)
                serializer=serializers.ProfileSerializer(UserInfo)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            except :
                return Response(status=status.HTTP_400_BAD_REQUEST)    
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)

    parser_classes = (MultiPartParser,)
    
    def put(self, request, username, format=None) :

        user=request.user
        if ( str(user) == username ) :
            #try : 
                
                UserInfo = models.User.objects.get(username=username)
                
                serializer = serializers.ProfileUpdateSerializer(UserInfo, data=request.data, partial=True)
                
                if serializer.is_valid() : 
                    
                    serializer.save()

                    return Response(data=serializer.data, status=status.HTTP_200_OK)
                else :
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            
            #except : 
            
            #    return Response(status=status.HTTP_400_BAD_REQUEST)
        #else :
        #    return Response(status=status.HTTP_404_NOT_FOUND)
         
class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
