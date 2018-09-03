from django.contrib import admin
from . import models
# Register your models here.

@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display =(
        'writer',
        'subject',
        'content',
        'videolink',
        'created',
        'updated'
    )

@admin.register(models.PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = (
        'postid',
        'ImgFile'
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
   list_display =(
        'creator',
        'post',
        'message'
    )