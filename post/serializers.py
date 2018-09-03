from rest_framework import serializers
from . import models
from users.models import User

class UserSerializer(serializers.ModelSerializer) :

    class Meta :
        model = User
        fields = (
            'id',
            'username'
        )

class PostImageSerializer(serializers.ModelSerializer) :

    class Meta :
        model = models.PostImage 
        fields = (
            'postid',
            'ImgFile'
        )    

class PostImageViewSerializer(serializers.ModelSerializer) :

    class Meta :
        model = models.PostImage 
        fields = (
            'id',
            'postid',
            'ImgFile'
        )  

class PostListSerializer(serializers.ModelSerializer) :

    postImages = PostImageViewSerializer(read_only=True, many=True)
    writer=UserSerializer(read_only=True)
    class Meta : 
        model = models.Post
        fields = (
          'id',
          'writer',
          'subject',
          'content',
          'videolink',
          'postImages',
        )        

class PostWriteSerializer(serializers.ModelSerializer) :
    
    writer=UserSerializer(read_only=True)
    #postImages = PostImageSerializer(read_only=True, many=True)
    
    class Meta : 
        model = models.Post
        fields = (
          'writer',
          'subject',
          'content',
          'videolink',
          'postImages'
        )        

    def create(self, validated_data):
        print(validated_data)
        #images_data = self.context.get('view').request.FILES
        #post = Post.objects.create(subejct=validated_data.get('title', 'no-title'),
        #                           content=validated_data.get('contents', 'no-title'),
        #                           subejct=validated_data.get('title', 'no-title')
        #                           )
        #for image_data in images_data.values():
        #PostImage.objects.create(postid=task, image=image_data)
        #return task

class UploadImageserializer (serializers.ModelSerializer) :

    ImgFile = serializers.FileField()
    
    class Meta :
        model = models.PostImage 
        fields = (
            'postid',
            'ImgFile'
         )      