from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from rest_framework_jwt.views import obtain_jwt_token
from users.views import FacebookLogin
from . import views
urlpatterns = [
    path('', include('post.urls')),
    path('profile/', include('users.urls')),
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/logout/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login')
    #path('api-token-auth/', obtain_jwt_token),
]
