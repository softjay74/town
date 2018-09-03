from rest_framework import serializers
from users.models import User

class ProfileSerializer(serializers.ModelSerializer) :

    class Meta :
        model = User
        fields = (
            'username',
            'email',
            'last_login',
            'date_joined',
            'name',
            'website',
            'bio',
            'phone',
            'gender',
            'profileImg',
        )

class ProfileWriteSerializer(serializers.ModelSerializer) :
    profileImg = serializers.FileField()
    class Meta :
        model = User
        fields = (
            'username',
            'password',
            'email',
            'name',
            'website',
            'bio',
            'phone',
            'gender',
            'profileImg',
        )        

class ProfileUpdateSerializer(serializers.ModelSerializer) :
    
    profileImg = serializers.FileField()
    class Meta :
        model = User
        fields = (
            'email',
            'name',
            'website',
            'bio',
            'phone',
            'gender',
            'profileImg',
        )                