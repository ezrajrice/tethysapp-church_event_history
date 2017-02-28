from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import os

dir_path = os.path.dirname(os.path.realpath(__file__))


@login_required()
def home(request):
    """
    Controller for the app home page.
    """

    context = {}

    return render(request, 'church_event_history/home.html', context)
