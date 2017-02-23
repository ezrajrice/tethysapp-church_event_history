from tethys_sdk.base import TethysAppBase, url_map_maker


class HurchEventHistory(TethysAppBase):
    """
    Tethys app class for hurch Event History.
    """

    name = 'hurch Event History'
    index = 'church_event_history:home'
    icon = 'church_event_history/images/icon.gif'
    package = 'church_event_history'
    root_url = 'church-event-history'
    color = '#e67e22'
    description = 'Place a brief description of your app here.'
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='church-event-history',
                           controller='church_event_history.controllers.home'),
        )

        return url_maps