from django.shortcuts import render
from . import serializers
from . import models
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
#from rest_framework.parsers import JSONParser

from rest_framework.parsers import MultiPartParser
# Create your views here.

class Post(APIView) :
    
    permission_classes = (AllowAny,)

    def get(self, fromat=None) : #Post List 보기

        try :
            PostList=models.Post.objects.all()

            getPostList=serializers.PostListSerializer(PostList, many=True)

            return Response(data=getPostList.data, status=status.HTTP_200_OK)
        
        except:

            return Response(status=status.HTTP_404_NOT_FOUND)

class Posting(APIView):
    
    #parser_classes = (MultiPartParser,)
    
    def post (self, request, format=None) :
        user=request.user
        print(user)
        data =request.data
        print(data)
        data=request.data['subject']
        print(data)
        

        return  Response(status=status.HTTP_404_NOT_FOUND)
         
class PostingForm(APIView):
    
    parser_classes = (MultiPartParser,)
    
    def post (self, request, format=None) :
        
        user=request.user
        print('////////////////////////////////////////')
        print('/////////   Form Test ////////////////////')
        print('/////////////////////////////////////////')
        
        data=request.data
        print(data)
        
        ImageFiles = request.FILES.getlist('ImgFile')
        
        for image in ImageFiles :
            print(image)
        
        return  Response(status=status.HTTP_404_NOT_FOUND)



class PostWrite(APIView) :
    
    parser_classes = (MultiPartParser,)

    def post (self, request) :
        
        user=request.user
        subject= request.data['subject']
        content= request.data['content']
        videolink= request.data['videolink']
        ImageFiles = request.FILES.getlist('ImgFile')
        PostSave =  models.Post.objects.create(
                 writer = user,
                 subject= request.data['subject'],
                 content= request.data['content'],
                 videolink= request.data['videolink'],
        )  
        PostSave.save()
        postNum=PostSave.id
        print(postNum)
      

        for image in ImageFiles :
            print(image)
            PostImageSave = models.PostImage.objects.create(
                    postid=models.Post.objects.get(id=postNum),
                    ImgFile=image
            )    
            
            PostImageSave.save()

        #try :
        PostList=models.Post.objects.get(id=postNum)

        getPostList=serializers.PostListSerializer(PostList)

        return Response(data=getPostList.data, status=status.HTTP_200_OK)
        
class PostView(APIView) :
    
    permission_classes = (AllowAny,)

    def get(self, request, postid, fromat=None) : #Post List 보기

        try :
            PostView=models.Post.objects.get(id=postid)

            getPostView=serializers.PostListSerializer(PostView)

            return Response(data=getPostView.data, status=status.HTTP_200_OK)
        
        except:

            return Response(status=status.HTTP_404_NOT_FOUND)
    
    parser_classes = (MultiPartParser,)
    
    def put(self, request, postid, fornamt=None) :
        
        user=request.user

        postCheck = models.Post.objects.get(id=postid, writer=user)  # 요청한 자료가 내가 쓴글이 맞는지 확인 

        if postCheck is None :

            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        else :
            # 1. DB Data Update    
            models.Post.objects.filter(id=postid, writer=user).update( 
                                        subject = request.data['subject'],
                                        content = request.data['content'],
                                        videolink = request.data['videolink']
            )  

            # 2. 삭제 요청 이미지 삭제 
            Del_images = request.data['ImgDel']
            if Del_images : 
                Del_images = Del_images.split(',') # 배열에 집어 넣음
            #print(Del_images)
                for imageid in Del_images :
                    try : 
                        del_Img=models.PostImage.objects.get(id=imageid)
                        del_Img.delete() # 자료가 있으면 삭제 
                    except : 
                        pass 

            # 3.새롭게 넘어온 이미지 upload 및 저장 

            ImageFiles = request.data.getlist('ImgFile')
            
            if ImageFiles : 
                for image in ImageFiles :
                    print(image)
                    PostImageSave = models.PostImage.objects.create(
                        postid=models.Post.objects.get(id=postid),
                        ImgFile=image
                )    
                PostImageSave.save()

            return Response(status=status.HTTP_200_OK)


    def delete(self, request, postid, fornamt=None) :

        user=request.user
        try : 
            postCheck = models.Post.objects.get(id=postid, writer=user)  # 요청한 자료가 내가 쓴글이 맞는지 확인 

            if postCheck is None :

                return Response( status=status.HTTP_400_BAD_REQUEST)
            
            else :
                models.Post.objects.filter(id=postid, writer=user).delete() # DB 있는 data 삭제 하고 
                models.PostImage.objects.filter(postid=postid).delete() # file 삭제 

                return Response(status=status.HTTP_200_OK)
        except : 

             return Response(status=status.HTTP_400_BAD_REQUEST)        


class PostImage(APIView) :
    
    parser_classes = (MultiPartParser,)

    def get(self, request) :
        
        try :
            PostImages=models.PostImage.objects.all()

            getPostImage=serializers.PostImageViewSerializer(PostImages, many=True)

            return Response(data=getPostImage.data, status=status.HTTP_200_OK)
        
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post (self, request) :

        try :
            #print(request.data)
            values = request.data.getlist('ImgFile')
            #print(values)
            ImgFile= request.data['ImgFile']
            print(ImgFile)
            for image in values :
                print(image)
                PostImageSave = models.PostImage.objects.create(
                        postid=models.Post.objects.get(id=request.data['postid']),
                        ImgFile=image
                )    
                
                PostImageSave.save()
            #print(dict(request.data.lists()))
            #getData=dict(request.data.lists()).value(postid)
            #print(getData) 
            #ImgFile = request.data['ImgFile']

            

            #ImgFile= request.data['ImgFile']
            #PostImageSave = models.PostImage.objects.create(
            #        postid=models.Post.objects.get(id=request.data['postid']),
            #        ImgFile=ImgFile
            #)    
            
            PostImageSave.save()
        
            return Response(data=getPostImage.data, status=status.HTTP_201_CREATED)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)    

class PostImageView(APIView) :
    
    #parser_classes = (MultiPartParser,)

    def get(self, request, imageid, format=None) :
        
        try :
            PostImages=models.PostImage.objects.get(id=imageid)

            getPostImage=serializers.PostImageViewSerializer(PostImages)

            return Response(data=getPostImage.data, status=status.HTTP_200_OK)
        
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)    

    def delete(self, request, imageid, format=None) :
        
            user = request.user
 
        #try :
            
            PostImages=models.PostImage.objects.values('postid').get(id=imageid)
            #print(PostImages['postid'])   
            postid=PostImages['postid']
            CheckPost=models.Post.objects.get(id=postid, writer=user )

            if CheckPost is None :
                
                return Response(status=status.HTTP_404_NOT_FOUND)    

            else :
                PostImages=models.PostImage.objects.get(id=imageid)    

                PostImages.delete()

                return Response(status=status.HTTP_200_OK)    

        #except : 
            
        #    return Response(status=status.HTTP_404_NOT_FOUND)    
       

class Image(APIView) :
    
    parser_classes = (MultiPartParser,)
   
    def post(self, request) :

        serializer = serializers.UploadImageserializer(data=request.data)
        
        if serializer.is_valid():
            
            serializer.save()
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        
        else :     
            
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)