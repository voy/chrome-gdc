SRC_TS = $(shell find src -iname *.ts -not -iname *.d.ts) 
SRC_JS = $(patsubst %.ts,%.js,$(SRC_TS)) 

TEST_TS = $(shell find test -iname *.ts -not -iname *.d.ts) 
TEST_JS = $(patsubst %.ts,%.js,$(TEST_TS)) 

all: $(SRC_JS) $(TEST_JS)

clean:
	find src test -iname *.js -delete

test: $(SRC_JS) $(TEST_JS)
	mocha

%.js : %.ts
	tsc $<

.PHONY: test
