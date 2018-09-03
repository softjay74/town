import os
from django.db import models
from django.dispatch import receiver
from users.models import User

class TimeStamped(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True    

class Post(TimeStamped) :
    writer = models.ForeignKey(User, on_delete=models.CASCADE, null=False,  related_name="user")
    subject = models.CharField(max_length=255, null=False)
    content = models.TextField(null=False)
    videolink = models.CharField(max_length=255, blank=True, null=True)

class PostImage(models.Model):
    postid=models.ForeignKey(Post, on_delete=models.CASCADE, related_name='postImages')
    ImgFile = models.ImageField(upload_to ='post', blank=False )

    

class Comment(TimeStamped):
    message = models.TextField()    
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)



@receiver(models.signals.post_delete, sender=PostImage)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `MediaFile` object is deleted.
    """
    if instance.ImgFile:
        if os.path.isfile(instance.ImgFile.path):
            os.remove(instance.ImgFile.path)

@receiver(models.signals.pre_save, sender=PostImage)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `MediaFile` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = PostImage.objects.get(pk=instance.pk).ImgFile
    except PostImage.DoesNotExist:
        return False

    new_file = instance.ImgFile
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)