# Generated by Django 2.1 on 2018-08-22 02:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0005_auto_20180821_1721'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postimage',
            name='postid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postImages', to='post.Post'),
        ),
    ]
