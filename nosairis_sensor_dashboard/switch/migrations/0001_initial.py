# Generated by Django 4.1.1 on 2022-10-02 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Switch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('switch', models.CharField(blank=True, max_length=256, null=True, verbose_name='Switch')),
                ('status', models.BooleanField(default=False, verbose_name='Switch Status')),
                ('timestamp', models.CharField(blank=True, max_length=256, null=True, verbose_name='Time Stamp')),
            ],
        ),
    ]
