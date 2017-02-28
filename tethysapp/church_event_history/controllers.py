from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import os

dir_path = os.path.dirname(os.path.realpath(__file__))


@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    # Read KML files as strings
    with open(dir_path + '/data/kml/points.kml') as points_file:
        pointsKML = points_file.read()
    with open(dir_path + '/data/kml/lines.kml') as lines_file:
        linesKML = lines_file.read()
    with open(dir_path + '/data/kml/poly.kml') as poly_file:
        polyKML = poly_file.read()

    context = {'pointsKML': pointsKML,
               'linesKML': linesKML,
               'polyKML': polyKML
               }

    return render(request, 'church_event_history/home.html', context)
