'use strict';
const appConfig = require('./appconfig');
const q = require('q');
const monk = require('monk')(appConfig.databaseConfig.url);
module.exports = {
    findDocs: function(collectionName, query, options) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).find(query, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    findOneDoc: function(collectionName, query, options) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).findOne(query, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    findOneAndSetDoc: function(collectionName, query, update, options) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).findOneAndUpdate(query, { $set: update }, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    findOneAndUpdateDoc: function(collectionName, query, update, options) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).findOneAndUpdate(query, update, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    findOneAndDeleteDoc: function(collectionName, query, options) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).findOneAndDelete(query, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    insertDoc: function(collectionName, documents) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).insert(documents, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    updateDoc: function(collectionName, query, data, Options) {
        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).update(query, data, Options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    updateDocById: function(collectionName, id, update, Options) {
        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).updateById(id, update, Options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    removeDocBy: function(collectionName, query) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).remove(query, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    removeDocById: function(collectionName, id) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).removeById(id, { justOne: true }, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });
        } catch (err) {
            deferred.reject(err);
        }
        return deferred.promise;
    },
    distinctBy: function(collectionName, field, query, options) {
        var _self = this;
        var deferred = q.defer();
        try {
            monk.get(collectionName).distinct(field, query, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    countBy: function(collectionName, query, options) {

        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).count(query, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    aggregateBy: function(collectionName, pipeline, options) {
        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).aggregate(pipeline, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    bulkWriteBy: function(collectionName, operations, options) {
        var _self = this;
        var deferred = q.defer();

        try {

            monk.get(collectionName).bulkWrite(operations, options, function(err, eventRes) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(eventRes);
                }
            });

        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    }
};