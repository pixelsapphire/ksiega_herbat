const SyncTasksManager = {
    executeSequence: () => {
        layoutHandlerTask();
        teaBoxesHandlerTask();
        collectionArrowsHandlerTask();
        loadingComplete();
    }
}