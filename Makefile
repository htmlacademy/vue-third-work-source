# Makefile for template sync

sync_section0:
	cd course/section0; echo "...Sync section0" && \
	mucli project sync

sync_section1:
	cd course/section1; echo "...Sync section1" && \
	mucli project sync

sync_section2:
	cd course/section2; echo "...Sync section2" && \
	mucli project sync

sync_section3:
	cd course/section3; echo "...Sync section3" && \
	mucli project sync

sync_section4:
	cd course/section4; echo "...Sync section4" && \
	mucli project sync

sync_section5:
	cd course/section5; echo "...Sync section5" && \
	mucli project sync

sync_section6:
	cd course/section6; echo "...Sync section6" && \
	mucli project sync

sync_section7:
	cd course/section7; echo "...Sync section7" && \
	mucli project sync

sync_section8:
	cd course/section8; echo "...Sync section8" && \
	mucli project sync

sync_all: sync_section0 sync_section1 sync_section2 sync_section3 \
    sync_section4 sync_section5 sync_section6 sync_section7 sync_section8
