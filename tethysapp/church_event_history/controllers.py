from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import os
from tethys_sdk.gizmos import SelectInput

dir_path = os.path.dirname(os.path.realpath(__file__))


@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'church_event_history/home.html', context)


@login_required()
def map(request):
    """
    Controller for the app map page.
    """
    event_id_list = [('None', 'none'),
                     ('Joseph Smith Birthplace Memorial', 'ID_00000'),
                     ('Smith Family Farm - Palmyra, New York', 'ID_00001'),
                     ('The Sacred Grove', 'ID_00002'), ('Hill Cumorah', 'ID_00003'),
                     ('Harmony, Pennsylvania', 'ID_00004'),
                     ('Grandin Building', 'ID_00005'), ('Peter Whitmer Farm', 'ID_00006'),
                     ('Newel K. Whitney Store', 'ID_00007'), ('Independence, Missouri', 'ID_00008'),
                     ('Kirtland Temple', 'ID_00009'),
                     ('Far West, Missouri', 'ID_00010'), ('Liberty Jail', 'ID_00011'), ('Nauvoo, Illinois', 'ID_00012'),
                     ('Nauvoo Temple', 'ID_00013'), ('Carthage Jail', 'ID_00014'),
                     ('Nauvoo House, Nauvoo, Illinois', 'ID_00015'),
                     ('Smith Burial Site', 'ID_00016')]

    select_input = SelectInput(display_text='Zoom to Event',
                               name='select_event',
                               multiple=False,
                               options=event_id_list,
                               initial=['None'],
                               original=['None'])
    context = {'select_input': select_input}

    return render(request, 'church_event_history/map.html', context)


@login_required()
def help(request):
    """
    Controller for the app help page.
    """
    context = {}

    return render(request, 'church_event_history/help.html', context)
