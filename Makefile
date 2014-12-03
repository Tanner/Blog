SHELL := /bin/bash

all: blog

blog:
	jekyll build

serve:
	jekyll serve --watch

clean:
	rm -rf _site/
