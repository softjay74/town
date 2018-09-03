import os
from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    GENDER_CHOICES = (
        ('male','Male'),
        ('female','Female'),
        ('not-specified','Not specified'),
    )

    name = models.CharField(max_length=255, blank=True)
    website = models.URLField(null=True)
    bio=models.TextField(null=True)
    phone=models.CharField(max_length=100, null=True )
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True )
    profileImg = models.ImageField(upload_to ='user', null=True )

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username' : self.username})    


@receiver(models.signals.pre_save, sender=User)
def auto_delete_file_on_change(sender, instance, **kwargs):
    
    if not instance.pk:
        return False
    
    try:
        old_file = User.objects.get(pk=instance.pk).profileImg

        if old_file : 

            new_file = instance.profileImg
            if not old_file == new_file:
                if os.path.isfile(old_file.path):
                        os.remove(old_file.path)
        else :
            return False    
    
    except :
        
        return False # User.DoesNotExist:
       
    #   return False
    #    if old_file is None :

    #    else :        
    