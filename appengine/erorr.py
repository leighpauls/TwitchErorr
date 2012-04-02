import time

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class MainPage(webapp.RequestHandler):
    def get(self):
        delayMs = int(self.request.get('delay', '0'))
        errorCode = int(self.request.get('error', '500'))

        time.sleep(float(delayMs)/1000.0)

        self.response.set_status(errorCode)

application = webapp.WSGIApplication(
                                     [('/', MainPage)],
                                     debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
