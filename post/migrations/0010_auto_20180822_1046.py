# Generated by Django 2.1 on 2018-08-22 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0009_auto_20180822_0956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postimage',
            name='ImgFile',
            field=models.ImageField(upload_to='post'),
        ),
    ]
