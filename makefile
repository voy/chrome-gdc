SRC_FILES = $(shell find src -iname *.ts -not -iname *.d.ts)
TEST_FILES = $(shell find src -iname *.ts -not -iname *.d.ts)

all:
	for f in $(SRC_FILES); do \
		tsc $$f; \
	done

build_test: 
	for f in $(TEST_FILES); do \
		tsc $$f; \
	done

clean:
	find src test -iname *.js -delete

test: build_test
	./node_modules/.bin/mocha --reporter spec

.PHONY: test
