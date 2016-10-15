'''Run the installation script'''
import subprocess as sp

if __name__ == '__main__':
  sp.call(['npm', 'i'])
  sp.call(['npm', 'start'])
