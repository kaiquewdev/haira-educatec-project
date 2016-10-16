'''Run the installation script'''
import subprocess as sp

def app():
  sp.call(['npm', 'i'])
  sp.call(['npm', 'start'])
