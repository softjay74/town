# Generated by Django 2.1 on 2018-08-22 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_auto_20180821_1718'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='videlink',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='postimage',
            name='ImgFile',
            field=models.ImageField(upload_to='post'),
        ),
    ]
