from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path ('post/', views.Post.as_view(), name="Post"),
    path ('postwrite/', views.PostWrite.as_view(), name="Post"),
    path ('posting/', views.PostWrite.as_view(), name="Posting"),
    path ('formtest/', views.PostingForm.as_view(), name="Posting"),
    path ('post/<slug:postid>/', views.PostView.as_view(), name="PostView"),
    path ('postimage/', views.PostImage.as_view(), name="PostView"),
    path ('postimage/<slug:imageid>/', views.PostImageView.as_view(), name="PostView"),
    path ('image/', views.Image.as_view(), name="Image"),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

