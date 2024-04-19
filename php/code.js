/* cached version 2024-04-16T20:55:37+00:00 */
function log() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const d = urlParams.get("jsd");
  const w = window.hasOwnProperty("jsd") && window.jsd === 1;
  if (d || w) {
    console.log(...arguments);
  }
}
function logException(error) {
  log(
    "Andata Tag Manager error:",
    "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
    error.message,
    error.stack
  );
  sendMdeploy("atm_exception", error.message, error.stack.toString());
  //sendMdeploy('98cbcd41-76ef-4cc8-8f19-5b8a6b932499', error.message, error.stack.toString());
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

async function sendMdeploy(eventName, message, stack) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://mdeploy.andata.ru/api2.php");
  xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      log(this.responseText);
    }
  });
  xhr.send(
    JSON.stringify({
      container_id: "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
      event_name: eventName,
      event_ubtcuid: window.ubtcuid ?? uuidv4(),
      event_source: "andata_tag_manager",
      event_datetime: new Date().toISOString(),
      event_data: { name: "exception" },
      event_context: {
        schema: "iglu:ru-andata/andata-exception-context/jsonschema/1-0-0",
        data: {
          url: window.location.href,
          instance: "tagmanager.andata.ru",
          atm_version: "unknown",
          app_id: "ekotelekom_zisej",
          container_id: "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
          container_version: "11",
          message,
          stack,
        },
      },
    })
  );
}
try {
  window.atm = new (function _andataTM(w, d) {
    /* Common JS */

    // if (!window.hasOwnProperty('globalid')) {
    //     window.globalid = function (event, data) {
    //         log("SNOWPLOW Event:", event, data);
    //     }
    // }

    const tagManager = this;

    // Disable by key
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("atm_disable")) {
      log("ATM disabled");
      return;
    }

    this.getVariable = function (name) {
      return this.getVariableObject(name).value();
    };

    this.getVariableObject = function (name) {
      if (!this.vars.hasOwnProperty(name)) {
        throw new Error("Variable " + name + " not found.");
      }
      return this.vars[name];
    };

    this.arrayAt = function (arr, pos) {
      if (!Array.isArray(arr) || !arr.length) {
        return null;
      }
      if (pos < 0) pos = arr.length + pos;
      if (arr[pos] === void 0) {
        return null;
      }
      return arr[pos];
    };

    this.compareObjects = function (a, b) {
      if (a === null || b === null) {
        return false;
      }
      for (let k in a) {
        if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
          return false;
        }
      }
      for (let k in b) {
        if (!a.hasOwnProperty(k) || a[k] !== b[k]) {
          return false;
        }
      }
      return true;
    };

    /**
     * Return property of object or default value if property not exists
     * @param o - Object
     * @param p - Property of object
     * @param d - Default value if property not exists
     * @returns {*}
     */
    function pd(o, p, d) {
      if (typeof o === "object" && o != null && o.hasOwnProperty(p))
        return o[p];
      else return d;
    }

    function AndataStack(varName, limit = 20) {
      this.name = "atm_stack_" + varName;
      this.limit = limit;
      const storage = new AndataTMStorage();
      this.data = storage.get(this.name, []);

      this.push = function (object) {
        const value = JSON.stringify(object);
        log("AndataStack push:::: ", value);
        this.data.push(value);
        if (this.data.length > this.limit) {
          // Оставялем this.limit последних сообщений
          this.data = this.data.slice(-this.limit);
        }
        storage.set(this.name, this.data);
      };
      this.get = function () {
        let response = this.data.map((it) => JSON.parse(it));
        log("AndataStack get:::: ", response);
        return response;
      };
    }

    function AndataVariableObject(callable) {
      const args = [...arguments];
      this.args = args.slice(1);
      this.value = callable;
    }
    AndataVariableObject.prototype.toString = function () {
      return this.value.apply(this, this.args);
    };
    this.AndataVariableObject = AndataVariableObject;

    function AndataContext(value = null) {
      this.value = value;
    }

    AndataContext.prototype.toString = function (context = null) {
      if (!this.value) return context;
      let value = pd(context, this.value, "undefined");
      try {
        value = JSON.parse(value);
      } catch (e) {}
      log(
        "AndataContext:::",
        "name:",
        this.value,
        "value:",
        value,
        "context: ",
        context
      );
      // if (Array.isArray(pd(context, this.value, 'undefined'))) {
      //     return JSON.stringify(pd(context, this.value, 'undefined'));
      // }
      return value;
    };

    this.AndataContext = AndataContext;

    function AndataTMJoin(arrayData) {
      this.value = arrayData;

      this.extractNotEmpty = function (first = true) {
        const notEmptyList = this.value.filter(
          (it) => typeof it === "object" || it.toString().length > 0
        );
        if (first && notEmptyList.length > 0) return notEmptyList[0];
        return notEmptyList;
      };
    }
    AndataTMJoin.prototype.toString = function (context = null) {
      return this.value
        .map((it) => {
          if (it === void 0) return "";
          return it.toString(context);
        })
        .join("");
    };

    this.AndataTMJoin = AndataTMJoin;

    this.AndataFunc = function AndataFunc(callable) {
      this.callable = callable;
      this.value = function (context = null) {
        return this.callable();
      };
    };

    this.AndataFunc.prototype.toString = function (context = null) {
      return this.callable().toString(context);
    };
    /**
     * Реализация зависимостей между тегами. Тег, защищенный AndataDependencyGuard будет выполняться только в том случае
     * если перед этим выполнились теги, от которых он зависит. Если теги-зависимости не выполнились, то выполнение тега
     * ставится в очередь и тег будет запущен когда остальные теги отработаны.
     * @param stateMachine - объект, где ключ - имя тега, значение - массив с именами тегов-зависимостей
     * @constructor
     */
    function AndataDependencyGuard(stateMachine) {
      this.stateMachine = stateMachine;
      this.executedTags = {};
      this.waitingTags = {};
      this.callbackTags = {};
      // Периодичность в милисекундах, с какой защитник будет проверять очередь
      this.queryReadInterval = 500;

      log("AndataDependencyGuard stateMachine:::", this.stateMachine);

      this.guard = function (tag) {
        // Если у тега tag нет зависимостей - возвращаем true
        if (!this.stateMachine.hasOwnProperty(tag)) {
          return true;
        }
        const dependencies = this.stateMachine[tag];
        return dependencies.every((property) =>
          this.executedTags.hasOwnProperty(property)
        );
      };

      this.apply = function (tag, callback) {
        return async (context) => {
          if (this.guard(tag)) {
            log(
              "RUN:::",
              callback,
              "executed:",
              this.executedTags,
              "context:",
              context
            );
            const response = await callback(context);
            this.executedTags[tag] = this.executedTags.hasOwnProperty(tag)
              ? this.executedTags[tag] + 1
              : 1;
            if (this.waitingTags.hasOwnProperty(tag)) {
              if (this.waitingTags[tag] > 0) {
                this.waitingTags[tag] -= 1;
                log(tag, "decrease", this.waitingTags[tag]);
              } else {
                delete this.waitingTags[tag];
                log(tag, "remove");
              }
            }
            return response;
          } else {
            this.waitingTags[tag] = this.waitingTags.hasOwnProperty(tag)
              ? this.waitingTags[tag] + 1
              : 1;
            this.callbackTags[tag] = callback;
          }
          log(
            "init deps",
            tag,
            "executed:",
            this.executedTags,
            "wait for run:",
            this.waitingTags,
            "enabled for run:",
            this.guard(tag)
          );
        };
      };

      window.setInterval(async () => {
        let tags = Object.keys(this.waitingTags);
        if (tags.length)
          log(
            "Timer:::",
            "waiting:",
            tags,
            "executed:",
            Object.keys(this.executedTags)
          );
        for (const tag of tags) {
          let enabled = this.guard(tag);
          if (!enabled) continue;
          let count = this.waitingTags[tag];
          log(
            "need run:",
            tag,
            this.waitingTags[tag],
            "items",
            this.callbackTags.hasOwnProperty(tag)
          );
          if (this.callbackTags.hasOwnProperty(tag)) {
            for (let i = 0; i < count; i++) {
              log("run ", tag, "iteration:", i);
              this.apply(tag, this.callbackTags[tag])();
            }
            delete this.waitingTags[tag];
          }
        }
      }, this.queryReadInterval);
    }

    this.AndataDependencyGuard = AndataDependencyGuard;

    function applyAndataTMJoin(obj, context = null, level = 0) {
      const data = {};
      for (let key in obj) {
        if (obj[key] && obj[key].constructor.name === "AndataFunc") {
          data[key] = obj[key].value(context);
        } else if (obj[key] && obj[key].constructor.name === "AndataTMJoin") {
          log("applyAndataTMJoin 1:::", key, obj[key].toString(context));
          try {
            if (Array.isArray(obj[key].extractNotEmpty().toString(context))) {
              data[key] = obj[key].extractNotEmpty().toString(context);
            } else {
              const income = obj[key].extractNotEmpty(false);
              if (income.length > 1) {
                data[key] = new AndataTMJoin(income).toString(context);
              } else if (income.length === 1) {
                data[key] = income[0].toString(context);
              }
            }
          } catch (e) {
            log(e.message, key, obj);
            return (data[key] = null);
          }
        } else if (
          obj[key] &&
          obj[key].constructor.name === "Object" &&
          obj[key] !== void 0
        ) {
          try {
            data[key] = applyAndataTMJoin(obj[key], context, level + 1);
          } catch (e) {
            log("applyAndataTMJoin error:", e.message, key, obj);
            return (data[key] = null);
          }
        } else {
          if (Object.is(obj[key], null)) {
            data[key] = null;
            if (obj[key] === void 0) {
              data[key] = "";
            }
          } else {
            try {
              if (typeof obj[key] === "boolean") {
                data[key] = obj[key];
              } else if (typeof obj[key] === "number") {
                data[key] = obj[key];
              } else {
                data[key] = obj[key].toString(context);
              }
            } catch (e) {
              log("error:::", e.message, key, obj);
              return (data[key] = null);
            }
          }
        }
      }
      if (level >= 0) log("DATA:::", data);
      return data;
    }
    this.applyAndataTMJoin = applyAndataTMJoin;

    function AndataTypeValidator() {
      this.isNumeric = (n) => !isNaN(n);
      this.isDate = (n) => !isNaN(Date.parse(n));
      this.isArray = (n) => Array.isArray(n);
      this.isString = (n) => typeof n === "string" || n instanceof String;
      this.isObject = (n) => typeof n === "object" || n !== null;

      this.check = function (name, type, value, required) {
        if (required && !value) {
          throw new Error("Param " + name + " is required");
        }
        switch (type) {
          case "number":
            if (this.isString(value)) {
              value = value.replace(" ", "");
            }
            if (this.isNumeric(value)) return Number(value);
            break;
          case "date":
            if (this.isDate(value)) return value;
            break;
          case "object":
            if (this.isObject(value)) return value;
            break;
          case "string":
            if (value === null) return "";
            if (this.isString(value)) return value;
            break;
          case "array":
            if (this.isArray(value)) return value;
        }
        throw new Error(
          "Value " + value + " of param " + name + " must have type " + type
        );
      };
    }

    /* Scroll event for AndataTM */
    function AndataTMScroller() {
      let self = this;
      this.scroll = function () {
        self.topPosition = window.scrollY;
        self.bottomPosition = window.scrollY + window.innerHeight;
        self.documentHeight = document.documentElement.scrollHeight;
        self.topPercent = Math.ceil(
          (self.topPosition / self.documentHeight) * 100
        );
        self.bottomPercent = Math.ceil(
          (self.bottomPosition / self.documentHeight) * 100
        );
        let event = new CustomEvent("andataTMScrollEvent", {
          detail: { scroller: self },
        });
        document.dispatchEvent(event);
      };

      this.getCurrentPercent = function () {
        return this.bottomPercent;
      };
      this.inViewPort = function (topPoint) {
        return topPoint > self.topPosition && topPoint < self.bottomPosition;
      };
      this.lessThanViewPort = function (topPoint) {
        const screenHeight = self.bottomPosition - self.topPosition;
        return topPoint > self.bottomPosition;
      };
    }

    /**
     * Служит для передачи информации о триггере в тег
     * @constructor
     */
    function AndataTMEvent() {
      this.getElement = function () {
        return this.currentDOMElement;
      };
      this.getTriggerName = function () {
        return this.currentTriggerName;
      };
      this.getTrigger = function () {
        return this.currentTrigger;
      };
      this.runner = function (element, params) {
        log("event:::", element, params);

        this.currentTriggerName = params.name;
        this.currentTrigger = params;
        this.currentDOMElement = element;
      };
      //document.addEventListener("click",  this.runner);
    }

    const andataTMEvent = new AndataTMEvent();

    function AndataTMEventDecorator(
      callable,
      DOMElement,
      params,
      context = null
    ) {
      return function () {
        andataTMEvent.runner(DOMElement, params);
        tagManager.triggerStorage.add(params.name, context);
        return callable.call(this, context);
      };
    }

    function AndataSMCreateEvents() {
      this.run = function (event) {
        if (
          !window.hasOwnProperty("andataStateService") ||
          typeof window.andataStateService !== "object"
        )
          return false;
        for (let key in window.andataStateService) {
          log("event", event.toUpperCase());
          window.andataStateService[key].send(event.toUpperCase());
        }
      };
    }

    this.AndataSMCreateEvents = AndataSMCreateEvents;

    function triggerStorage() {
      this.data = [];
      this.contexts = {};

      this.getKey = function (name) {
        return name;
      };

      this.add = function (name, context) {
        const hash = this.getKey(name);
        if (this.data.indexOf(hash) == -1) {
          this.data.push(hash);
        }
        this.contexts[hash] = context;
        log("add:::", name, hash);
        document.dispatchEvent(
          new CustomEvent("writeToTriggerCollector", { detail: hash })
        );
      };

      this.delete = function (name) {
        const hash = this.getKey(name);
        const index = this.data.indexOf(hash);
        if (index > -1) {
          this.data.splice(index, 1);
        }
      };

      this.check = function (eventList) {
        let response = true;
        let context = {};
        log("triggerStorage", this.data);
        eventList.forEach((it) => {
          let key = this.getKey(it);
          let current = this.data.filter((event) => event === key);
          if (current.length === 0) {
            response = false;
          } else {
            context = {
              ...context,
              ...this.contexts[key],
            };
          }
        });
        if (response) {
          eventList.forEach((it) => {
            this.delete(it);
          });
          return context;
        } else {
          return false;
        }
      };
    }

    this.triggerStorage = new triggerStorage();

    this.eventer = document;

    function AndataTMStorage() {
      this.set = function (name, value) {
        log("AndataTMStorage.set", name, value);
        if (typeof Storage !== "undefined") {
          if (typeof value !== "string" && typeof value !== "number") {
            value = JSON.stringify(value);
          }
          localStorage.setItem(name, value);
          return value;
        } else {
          console.error("LocalStorage is not accessible in this browser");
        }
      };
      (this.isSet = function (name) {
        return localStorage.getItem(name) !== null;
      }),
        (this.get = function (name, defaultValue) {
          let value = localStorage.getItem(name);
          try {
            value = JSON.parse(value);
          } catch (e) {}
          log("GET VALUE:", value);
          return value ? value : defaultValue;
        });
    }

    this.AndataTMStorage = AndataTMStorage;

    this.AndataParamsParser = function AndataParamsParser(params) {
      //let newParams = params.replaceAll(/new\sthis\.AndataTMJoin\(\[(.*?)\]\)/ig);
      let modifiedStr = params.replaceAll(
        /new\sthis\.AndataTMJoin\(\[([\s\S]+)\]\)/g,
        "[$1]"
      );
      modifiedStr = modifiedStr.replace(/\,[\s]*\}\s*$/g, "}");
      const object = JSON.parse(modifiedStr);
      const keys = Object.keys(object);
      const result = {};
      keys.forEach((key) => {
        if (Array.isArray(object[key])) {
          //console.log(" this.AndataTMJoin:::",  new this.AndataTMJoin((object[key])));
          result[key] = new this.AndataTMJoin(object[key]);
        } else {
          result[key] = object[key];
        }
      });
      return result;
    };

    /* Predefined variables start */
    this.vars = {};
    this.varsNamespace = {};

    /* Set variables for triggers: trigger`s object, name and DOM Element(for click) */
    this.vars["var_currentTrigger"] = new AndataVariableObject(() => {
      return andataTMEvent.getTrigger();
    });
    this.varsNamespace["var_currentTrigger"] = "var_currentTrigger";

    this.vars["var_currentTriggerName"] = new AndataVariableObject(() => {
      return andataTMEvent.getTriggerName();
    });
    this.varsNamespace["var_currentTriggerName"] = "var_currentTriggerName";

    this.vars["var_currentDOMElement"] = new AndataVariableObject(() => {
      return andataTMEvent.getElement();
    });
    this.varsNamespace["var_currentDOMElement"] = "var_currentDOMElement";

    this.vars["var_currentDateTime"] = new AndataVariableObject(() => {
      return new Date().toISOString();
    });
    this.varsNamespace["_currentDateTime"] = "var_currentDateTime";

    this.vars["var_currentURL"] = new AndataVariableObject(() => {
      return decodeURIComponent(document.location.href);
    });
    this.varsNamespace["_currentURL"] = "var_currentURL";

    this.vars["var_referrerURL"] = new AndataVariableObject(() => {
      return document.referrer;
    });
    this.varsNamespace["_referrerURL"] = "var_referrerURL";

    this.vars["_currentEventName"] = new AndataVariableObject(() => {
      return "";
    });
    this.varsNamespace["_currentEventName"] = "_currentEventName";

    const andataTMScroller = new AndataTMScroller();
    document.addEventListener("scroll", andataTMScroller.scroll);

    this.vars["var_currentScrollPercent"] = new AndataVariableObject(() => {
      return andataTMScroller.getCurrentPercent();
    });
    this.varsNamespace["var_currentScrollPercent"] = "var_currentScrollPercent";
    this.vars["var_ubtcuid"] = new AndataVariableObject(function () {
      // если переменная не создана - инциализируем ее
      if (!window.ubtcuid) {
        window.ubtcuid = uuidv4();
      }
      return window.ubtcuid;
    });
    this.varsNamespace["var_ubtcuid"] = "var_ubtcuid";

    /* Predefined variables end */

    this.ATMRandom = function ATMRandom() {
      this.get = function () {
        return Math.random() * 100;
      };
    };

    function AndataTMLocationObserver(delay, callable) {
      this.observeUrlChange = () => {
        let oldHref = document.location.href;
        const body = document.querySelector("body");
        const observer = new MutationObserver((mutations) => {
          mutations.forEach(() => {
            if (oldHref !== document.location.href) {
              oldHref = document.location.href;
              log("AndataTMLocationObserver: ", document.location.href);
              setTimeout(callable, parseInt(delay) ?? 0);
            }
          });
        });
        observer.observe(body, { childList: true, subtree: true });
      };

      window.addEventListener("load", this.observeUrlChange);
    }

    function AndataTMPercentScroller(
      percent,
      callable,
      params,
      oneTime = true
    ) {
      log("oneTime", oneTime);
      this.callable = callable;
      this.percent = parseInt(percent.toString());
      this.ran = false;
      this.params = params;
      this.oneTime = oneTime;
      let self = this;
      this.runner = function (event) {
        let percent = event.detail.scroller.getCurrentPercent();
        if (!self.oneTime && percent < self.percent) {
          self.ran = false;
        }
        if (self.ran) return;
        if (percent >= self.percent) {
          self.ran = true;
          callable = AndataTMEventDecorator(self.callable, null, self.params);
          callable();
        }
      };

      document.addEventListener("andataTMScrollEvent", this.runner);
    }

    function AndataTMSelectorScroller(
      selector,
      callable,
      params,
      oneTime = true
    ) {
      this.callable = callable;
      this.selector = selector;
      this.oneTime = oneTime;
      this.params = params;
      log("AndataTMSelectorScroller:::", params);
      this.elements = Array.from(document.querySelectorAll(this.selector));
      this.elementTops = this.elements.map((it) => {
        return it.getBoundingClientRect().top;
      });
      this.unvisitedTops = [...this.elementTops];
      if (!this.elementTops.length) return;
      let self = this;
      this.runner = function (event) {
        if (!self.elementTops.length) return;
        self.elementTops.forEach((elementTop) => {
          const idx = self.unvisitedTops.indexOf(elementTop);
          const eIdx = self.elementTops.indexOf(elementTop);
          if (event.detail.scroller.inViewPort(elementTop)) {
            if (idx >= 0) {
              let item = self.elements[eIdx];
              self.unvisitedTops.splice(idx, 1);
              callable = AndataTMEventDecorator(
                self.callable,
                item,
                self.params
              );
              callable();
            }
          } else if (
            !self.oneTime &&
            event.detail.scroller.lessThanViewPort(elementTop)
          ) {
            if (idx === -1) {
              self.unvisitedTops.push(elementTop);
            }
          }
        });
      };

      document.addEventListener("andataTMScrollEvent", this.runner);
      //document.addEventListener("load", this.runner);
    }

    /* end Common JS */

    /* tagDependencies */
    const dependenciesConfig = {
      tag_9b91d138_9933_4d02_9553_60f1dd7cbc44: [],
      tag_9bac25a7_3110_4f65_8528_aefe6ffaff01: [],
      tag_9bac25d6_e8d5_450a_92ab_8175239a3853: [],
      tag_9bac261c_cbb2_4f9d_8837_5fdac200ee4c: [],
      tag_9bac2649_ce3e_4f62_baf3_75b6e7e5e40d: [],
      tag_9bac26e3_5329_4364_8ad3_1017cef17220: [],
      tag_9bac3459_0da7_4dc3_9926_ea76173f9740: [],
      tag_9bac3497_616b_4c08_a65c_ab22b94dde1a: [],
      tag_9bac3526_0b5e_4fa9_9e98_2cbd10d621a4: [],
      tag_9bac360f_d6fd_482a_a180_ef1643e84164: [],
      tag_9bac3798_7aeb_4cf5_aa8d_3faee92bbe9f: [],
      tag_9bac3b8a_0898_424a_aa60_a87ba98c6ac2: [],
      tag_9bac3d20_ab50_4503_850d_0b4872e52cf4: [],
      tag_9bac3de0_2f90_491c_b759_969b46ef5b65: [],
      tag_9bac4058_f3c8_4f5c_bbb3_dfe9fb9a4e3f: [],
      tag_9bac41ab_3bca_43e2_be8b_076e95973983: [],
      tag_9bac5cfb_cd45_4140_ad52_1808034d1f9f: [],
      tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3: [],
      tag_9bac5f7c_2491_4670_9878_17e3c69bc4dd: [],
      tag_9badae69_9bfd_47e7_8c50_760664326c97: [],
      tag_9bca53af_fdde_443a_99b5_f6856ea259e3: [],
      tag_9bca53f9_b13c_4b36_a551_979d71ff8ce9: [],
      tag_9bd2b3bf_7288_483c_9502_ebeb8928f45d: [],
      tag_9bd2c618_5879_471c_88e0_f4087c4939b5: [],
      tag_9bd2c64c_62bc_47f3_b833_240f2b43a797: [],
      tag_9bd2c68e_22db_4ab5_8c63_d75f6f3d7c8b: [],
      tag_9bd2c7ed_653b_4fcc_927e_946765445f1c: [],
      tag_9bd2ca8c_602a_4210_af2b_098cbd4deac1: [],
      tag_9bd2cac6_35b1_40fc_96b0_42f868eef960: [],
      tag_9bd2cb19_2992_49ab_8327_808354bb5bac: [],
      tag_9bd2cfa2_2d4c_4e51_afb5_0cee86ab64f1: [],
      tag_9bd2d1be_84aa_4000_9b06_d39d957d4b0e: [],
      tag_9bd2d574_eb9e_4598_8d3a_5e7aeed3fb73: [],
      tag_9bd2d59d_25d6_47fd_8ad0_9788d57d1ed3: [],
      tag_9bd2d628_c2ee_4fc9_bc0b_4de69bb82a33: [],
      tag_9bd2d6e2_9c06_4909_8143_efac25aa0e96: [],
      tag_9bd2da49_f100_408f_82f3_c9ce910a0cbe: [],
      tag_9bd2dbbc_acae_455f_9c76_1d74d5e75e12: [],
      tag_9bd2dfb0_25ef_43ac_bddf_8eec467766bd: [],
    };
    const dependencyGuard = new AndataDependencyGuard(dependenciesConfig);
    /* varTypes */
    function inputValueVariableObject(name, params) {
      this.params = params;
      this.value = function () {
        let newParams = applyAndataTMJoin(params.value());
        let collection = document.querySelectorAll(newParams.selector);
        log("inputValue", newParams, newParams.selector, collection);
        if (collection.length) {
          return collection[0].value.replace(/['"]/g, "\\$&");
        }
        return null;
      };
    }
    inputValueVariableObject.prototype.toString = function () {
      return this.value.apply(tagManager);
    };

    inputValueVariableObject.prototype.toJSON = function () {
      return this.value.apply(tagManager);
    };

    this.inputValueVariableObject = inputValueVariableObject;

    function customVariableObject(name, params) {
      this.value = function (prop = null) {
        const tagManager = this;
        let newParams = params.value();

        if (newParams.persistent) {
          const storage = new tagManager.AndataTMStorage();
          const defaultValue = newParams.default ?? "undefined";
          return value
            ? storage.set(key, value)
            : storage.get(key, defaultValue);
        }
        try {
          let result = newParams.callable.call(this);
          if (prop !== null) {
            if (
              typeof result === "object" &&
              result !== null &&
              result.hasOwnProperty(prop)
            ) {
              return result[prop];
            } else {
              return null;
            }
          }
          return result;
        } catch (e) {
          console.log(
            `Custom variable "${name}" contains errors. Fix the function in Andata Tag Manager for this container.`
          );
          console.log(e.toString().split(/\n/).at(0));
          return "undefined";
        }
      };
    }
    customVariableObject.prototype.toString = function () {
      return this.value.apply(tagManager);
    };

    customVariableObject.prototype.toJSON = function () {
      return this.value.apply(tagManager);
    };

    this.customVariableObject = customVariableObject;

    /* tagTypes */
    const tagTypes = {
      dummy(params) {
        return (context = null) => {
          console.log("dummy");
        };
      },
      AndataTracking(params) {
        return (context = null) => {
          const client = params.app_id,
            scriptURL =
              "https://" + params.mdeploy_host + "/i/_auto/" + params.app_id;
          if (typeof AndataTracking === "undefined") {
            class AndataTracking {
              constructor() {
                this.ubtcuid = null;
                this.l_ubtcuid = null;
                this.mphone_pagehit = null;
              }

              static get client() {
                return client;
              }

              static get scriptURL() {
                return scriptURL;
              }

              static loadJS(src, callback) {
                var s = document.createElement("script");
                s.src = src;
                s.async = true;
                s.onreadystatechange = s.onload = function () {
                  var state = s.readyState;
                  if (
                    !callback.done &&
                    (!state || /loaded|complete/.test(state))
                  ) {
                    callback.done = true;
                    callback();
                  }
                };
                document.getElementsByTagName("head")[0].appendChild(s);
              }

              static loadFormsHandler() {}

              static getContext() {
                return [
                  {
                    schema:
                      "iglu:ru.andata/forms_pagehit_cuid/jsonschema/1-0-0",
                    data: {
                      ubtcuid: this.ubtcuid,
                      last_ubtcuid: this.l_ubtcuid,
                    },
                  },
                  {
                    schema:
                      "iglu:ru.andata/andata_tag_manager/jsonschema/1-0-0",
                    data: {
                      container_id: "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
                    },
                  },
                ];
              }
            }

            var _ubtcuid = document.cookie.match(
              new RegExp(
                "(?:^|; )" +
                  "_ubtcuid".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                  "=([^;]*)"
              )
            );
            _ubtcuid = _ubtcuid ? _ubtcuid[1] : "";
            AndataTracking.l_ubtcuid = _ubtcuid;
            if (!!window.ubtcuid) {
              AndataTracking.ubtcuid = window.ubtcuid;
            } else {
              var ccid = "_" + Math.random().toString(36).substr(2, 16);
              AndataTracking.ubtcuid = (
                [1e7] +
                -1e3 +
                -4e3 +
                -8e3 +
                -1e11
              ).replace(
                /[018]/g,
                (c = function (с) {
                  return (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] &
                      (15 >> (c / 4)))
                  ).toString(16);
                })
              );
              window.ubtcuid = AndataTracking.ubtcuid;
            }
            if (!window["globalid"]) {
              window.GlobalAndataTrackingNamespace =
                window.GlobalAndataTrackingNamespace || [];
              window.GlobalAndataTrackingNamespace.push("globalid");
              window["globalid"] = function () {
                (window["globalid"].q = window["globalid"].q || []).push(
                  arguments
                );
              };
              window["globalid"].q = window["globalid"].q || [];

              /* tracking */
              //"use strict";
              function ownKeys(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                  var r = Object.getOwnPropertySymbols(t);
                  e &&
                    (r = r.filter(function (e) {
                      return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    n.push.apply(n, r);
                }
                return n;
              }
              function _objectSpread(t) {
                for (var e = 1; e < arguments.length; e++) {
                  var n = null != arguments[e] ? arguments[e] : {};
                  e % 2
                    ? ownKeys(n, !0).forEach(function (e) {
                        _defineProperty(t, e, n[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                          t,
                          Object.getOwnPropertyDescriptors(n)
                        )
                      : ownKeys(n).forEach(function (e) {
                          Object.defineProperty(
                            t,
                            e,
                            Object.getOwnPropertyDescriptor(n, e)
                          );
                        });
                }
                return t;
              }
              function _defineProperty(e, t, n) {
                return (
                  t in e
                    ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (e[t] = n),
                  e
                );
              }
              function _typeof(e) {
                return (_typeof =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function (e) {
                        return typeof e;
                      }
                    : function (e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              !(function o(i, c, s) {
                function u(t, e) {
                  if (!c[t]) {
                    if (!i[t]) {
                      var n = "function" == typeof require && require;
                      if (!e && n) return n(t, !0);
                      if (l) return l(t, !0);
                      var r = new Error("Cannot find module '" + t + "'");
                      throw ((r.code = "MODULE_NOT_FOUND"), r);
                    }
                    var a = (c[t] = { exports: {} });
                    i[t][0].call(
                      a.exports,
                      function (e) {
                        return u(i[t][1][e] || e);
                      },
                      a,
                      a.exports,
                      o,
                      i,
                      c,
                      s
                    );
                  }
                  return c[t].exports;
                }
                for (
                  var l = "function" == typeof require && require, e = 0;
                  e < s.length;
                  e++
                )
                  u(s[e]);
                return u;
              })(
                {
                  1: [
                    function (e, t, n) {
                      var r = {
                        utf8: {
                          stringToBytes: function (e) {
                            return r.bin.stringToBytes(
                              unescape(encodeURIComponent(e))
                            );
                          },
                          bytesToString: function (e) {
                            return decodeURIComponent(
                              escape(r.bin.bytesToString(e))
                            );
                          },
                        },
                        bin: {
                          stringToBytes: function (e) {
                            for (var t = [], n = 0; n < e.length; n++)
                              t.push(255 & e.charCodeAt(n));
                            return t;
                          },
                          bytesToString: function (e) {
                            for (var t = [], n = 0; n < e.length; n++)
                              t.push(String.fromCharCode(e[n]));
                            return t.join("");
                          },
                        },
                      };
                      t.exports = r;
                    },
                    {},
                  ],
                  2: [
                    function (e, t, n) {
                      var o, r;
                      (o =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
                        (r = {
                          rotl: function (e, t) {
                            return (e << t) | (e >>> (32 - t));
                          },
                          rotr: function (e, t) {
                            return (e << (32 - t)) | (e >>> t);
                          },
                          endian: function (e) {
                            if (e.constructor == Number)
                              return (
                                (16711935 & r.rotl(e, 8)) |
                                (4278255360 & r.rotl(e, 24))
                              );
                            for (var t = 0; t < e.length; t++)
                              e[t] = r.endian(e[t]);
                            return e;
                          },
                          randomBytes: function (e) {
                            for (var t = []; 0 < e; e--)
                              t.push(Math.floor(256 * Math.random()));
                            return t;
                          },
                          bytesToWords: function (e) {
                            for (
                              var t = [], n = 0, r = 0;
                              n < e.length;
                              n++, r += 8
                            )
                              t[r >>> 5] |= e[n] << (24 - (r % 32));
                            return t;
                          },
                          wordsToBytes: function (e) {
                            for (var t = [], n = 0; n < 32 * e.length; n += 8)
                              t.push((e[n >>> 5] >>> (24 - (n % 32))) & 255);
                            return t;
                          },
                          bytesToHex: function (e) {
                            for (var t = [], n = 0; n < e.length; n++)
                              t.push((e[n] >>> 4).toString(16)),
                                t.push((15 & e[n]).toString(16));
                            return t.join("");
                          },
                          hexToBytes: function (e) {
                            for (var t = [], n = 0; n < e.length; n += 2)
                              t.push(parseInt(e.substr(n, 2), 16));
                            return t;
                          },
                          bytesToBase64: function (e) {
                            for (var t = [], n = 0; n < e.length; n += 3)
                              for (
                                var r =
                                    (e[n] << 16) | (e[n + 1] << 8) | e[n + 2],
                                  a = 0;
                                a < 4;
                                a++
                              )
                                8 * n + 6 * a <= 8 * e.length
                                  ? t.push(o.charAt((r >>> (6 * (3 - a))) & 63))
                                  : t.push("=");
                            return t.join("");
                          },
                          base64ToBytes: function (e) {
                            e = e.replace(/[^A-Z0-9+\/]/gi, "");
                            for (
                              var t = [], n = 0, r = 0;
                              n < e.length;
                              r = ++n % 4
                            )
                              0 != r &&
                                t.push(
                                  ((o.indexOf(e.charAt(n - 1)) &
                                    (Math.pow(2, -2 * r + 8) - 1)) <<
                                    (2 * r)) |
                                    (o.indexOf(e.charAt(n)) >>> (6 - 2 * r))
                                );
                            return t;
                          },
                        }),
                        (t.exports = r);
                    },
                    {},
                  ],
                  3: [
                    function (e, t, n) {
                      function a(e) {
                        var t = -e.getTimezoneOffset();
                        return null !== t ? t : 0;
                      }
                      function r(e, t, n) {
                        var r = new Date();
                        return (
                          void 0 !== e && r.setFullYear(e),
                          r.setMonth(t),
                          r.setDate(n),
                          r
                        );
                      }
                      function o(e) {
                        return a(r(e, 0, 2));
                      }
                      function i(e) {
                        return a(r(e, 5, 2));
                      }
                      var c, s;
                      (c = this),
                        ((s = {
                          determine: function () {
                            var e = (function () {
                              var e = o(),
                                t = i(),
                                n = e - t;
                              return n < 0
                                ? e + ",1"
                                : 0 < n
                                  ? t + ",1,s"
                                  : e + ",0";
                            })();
                            return new s.TimeZone(s.olson.timezones[e]);
                          },
                          date_is_dst: function (e) {
                            var t = 7 < e.getMonth(),
                              n = t ? i(e.getFullYear()) : o(e.getFullYear()),
                              r = n - a(e);
                            return n < 0 || t ? 0 != r : r < 0;
                          },
                          dst_start_for: function (e) {
                            var t = new Date(2010, 6, 15, 1, 0, 0, 0);
                            return {
                              "America/Denver": new Date(
                                2011,
                                2,
                                13,
                                3,
                                0,
                                0,
                                0
                              ),
                              "America/Mazatlan": new Date(
                                2011,
                                3,
                                3,
                                3,
                                0,
                                0,
                                0
                              ),
                              "America/Chicago": new Date(
                                2011,
                                2,
                                13,
                                3,
                                0,
                                0,
                                0
                              ),
                              "America/Mexico_City": new Date(
                                2011,
                                3,
                                3,
                                3,
                                0,
                                0,
                                0
                              ),
                              "America/Asuncion": new Date(
                                2012,
                                9,
                                7,
                                3,
                                0,
                                0,
                                0
                              ),
                              "America/Santiago": new Date(
                                2012,
                                9,
                                3,
                                3,
                                0,
                                0,
                                0
                              ),
                              "America/Campo_Grande": new Date(
                                2012,
                                9,
                                21,
                                5,
                                0,
                                0,
                                0
                              ),
                              "America/Montevideo": new Date(
                                2011,
                                9,
                                2,
                                3,
                                0,
                                0,
                                0
                              ),
                              "America/Sao_Paulo": new Date(
                                2011,
                                9,
                                16,
                                5,
                                0,
                                0,
                                0
                              ),
                              "America/Los_Angeles": new Date(
                                2011,
                                2,
                                13,
                                8,
                                0,
                                0,
                                0
                              ),
                              "America/Santa_Isabel": new Date(
                                2011,
                                3,
                                5,
                                8,
                                0,
                                0,
                                0
                              ),
                              "America/Havana": new Date(
                                2012,
                                2,
                                10,
                                2,
                                0,
                                0,
                                0
                              ),
                              "America/New_York": new Date(
                                2012,
                                2,
                                10,
                                7,
                                0,
                                0,
                                0
                              ),
                              "Europe/Helsinki": new Date(
                                2013,
                                2,
                                31,
                                5,
                                0,
                                0,
                                0
                              ),
                              "Pacific/Auckland": new Date(
                                2011,
                                8,
                                26,
                                7,
                                0,
                                0,
                                0
                              ),
                              "America/Halifax": new Date(
                                2011,
                                2,
                                13,
                                6,
                                0,
                                0,
                                0
                              ),
                              "America/Goose_Bay": new Date(
                                2011,
                                2,
                                13,
                                2,
                                1,
                                0,
                                0
                              ),
                              "America/Miquelon": new Date(
                                2011,
                                2,
                                13,
                                5,
                                0,
                                0,
                                0
                              ),
                              "America/Godthab": new Date(
                                2011,
                                2,
                                27,
                                1,
                                0,
                                0,
                                0
                              ),
                              "Europe/Moscow": t,
                              "Asia/Amman": new Date(2013, 2, 29, 1, 0, 0, 0),
                              "Asia/Beirut": new Date(2013, 2, 31, 2, 0, 0, 0),
                              "Asia/Damascus": new Date(2013, 3, 6, 2, 0, 0, 0),
                              "Asia/Jerusalem": new Date(
                                2013,
                                2,
                                29,
                                5,
                                0,
                                0,
                                0
                              ),
                              "Asia/Yekaterinburg": t,
                              "Asia/Omsk": t,
                              "Asia/Krasnoyarsk": t,
                              "Asia/Irkutsk": t,
                              "Asia/Yakutsk": t,
                              "Asia/Vladivostok": t,
                              "Asia/Baku": new Date(2013, 2, 31, 4, 0, 0),
                              "Asia/Yerevan": new Date(2013, 2, 31, 3, 0, 0),
                              "Asia/Kamchatka": t,
                              "Asia/Gaza": new Date(2010, 2, 27, 4, 0, 0),
                              "Africa/Cairo": new Date(2010, 4, 1, 3, 0, 0),
                              "Europe/Minsk": t,
                              "Pacific/Apia": new Date(2010, 10, 1, 1, 0, 0, 0),
                              "Pacific/Fiji": new Date(2010, 11, 1, 0, 0, 0),
                              "Australia/Perth": new Date(
                                2008,
                                10,
                                1,
                                1,
                                0,
                                0,
                                0
                              ),
                            }[e];
                          },
                        }).TimeZone = function (e) {
                          var a = {
                              "America/Denver": [
                                "America/Denver",
                                "America/Mazatlan",
                              ],
                              "America/Chicago": [
                                "America/Chicago",
                                "America/Mexico_City",
                              ],
                              "America/Santiago": [
                                "America/Santiago",
                                "America/Asuncion",
                                "America/Campo_Grande",
                              ],
                              "America/Montevideo": [
                                "America/Montevideo",
                                "America/Sao_Paulo",
                              ],
                              "Asia/Beirut": [
                                "Asia/Amman",
                                "Asia/Jerusalem",
                                "Asia/Beirut",
                                "Europe/Helsinki",
                                "Asia/Damascus",
                              ],
                              "Pacific/Auckland": [
                                "Pacific/Auckland",
                                "Pacific/Fiji",
                              ],
                              "America/Los_Angeles": [
                                "America/Los_Angeles",
                                "America/Santa_Isabel",
                              ],
                              "America/New_York": [
                                "America/Havana",
                                "America/New_York",
                              ],
                              "America/Halifax": [
                                "America/Goose_Bay",
                                "America/Halifax",
                              ],
                              "America/Godthab": [
                                "America/Miquelon",
                                "America/Godthab",
                              ],
                              "Asia/Dubai": ["Europe/Moscow"],
                              "Asia/Dhaka": ["Asia/Yekaterinburg"],
                              "Asia/Jakarta": ["Asia/Omsk"],
                              "Asia/Shanghai": [
                                "Asia/Krasnoyarsk",
                                "Australia/Perth",
                              ],
                              "Asia/Tokyo": ["Asia/Irkutsk"],
                              "Australia/Brisbane": ["Asia/Yakutsk"],
                              "Pacific/Noumea": ["Asia/Vladivostok"],
                              "Pacific/Tarawa": [
                                "Asia/Kamchatka",
                                "Pacific/Fiji",
                              ],
                              "Pacific/Tongatapu": ["Pacific/Apia"],
                              "Asia/Baghdad": ["Europe/Minsk"],
                              "Asia/Baku": ["Asia/Yerevan", "Asia/Baku"],
                              "Africa/Johannesburg": [
                                "Asia/Gaza",
                                "Africa/Cairo",
                              ],
                            },
                            o = e;
                          return (
                            void 0 !== a[o] &&
                              (function () {
                                for (
                                  var e = a[o], t = e.length, n = 0, r = e[0];
                                  n < t;
                                  n += 1
                                )
                                  if (
                                    ((r = e[n]),
                                    s.date_is_dst(s.dst_start_for(r)))
                                  )
                                    return (o = r);
                              })(),
                            {
                              name: function () {
                                return o;
                              },
                            }
                          );
                        }),
                        (s.olson = {}),
                        (s.olson.timezones = {
                          "-720,0": "Pacific/Majuro",
                          "-660,0": "Pacific/Pago_Pago",
                          "-600,1": "America/Adak",
                          "-600,0": "Pacific/Honolulu",
                          "-570,0": "Pacific/Marquesas",
                          "-540,0": "Pacific/Gambier",
                          "-540,1": "America/Anchorage",
                          "-480,1": "America/Los_Angeles",
                          "-480,0": "Pacific/Pitcairn",
                          "-420,0": "America/Phoenix",
                          "-420,1": "America/Denver",
                          "-360,0": "America/Guatemala",
                          "-360,1": "America/Chicago",
                          "-360,1,s": "Pacific/Easter",
                          "-300,0": "America/Bogota",
                          "-300,1": "America/New_York",
                          "-270,0": "America/Caracas",
                          "-240,1": "America/Halifax",
                          "-240,0": "America/Santo_Domingo",
                          "-240,1,s": "America/Santiago",
                          "-210,1": "America/St_Johns",
                          "-180,1": "America/Godthab",
                          "-180,0": "America/Argentina/Buenos_Aires",
                          "-180,1,s": "America/Montevideo",
                          "-120,0": "America/Noronha",
                          "-120,1": "America/Noronha",
                          "-60,1": "Atlantic/Azores",
                          "-60,0": "Atlantic/Cape_Verde",
                          "0,0": "UTC",
                          "0,1": "Europe/London",
                          "60,1": "Europe/Berlin",
                          "60,0": "Africa/Lagos",
                          "60,1,s": "Africa/Windhoek",
                          "120,1": "Asia/Beirut",
                          "120,0": "Africa/Johannesburg",
                          "180,0": "Asia/Baghdad",
                          "180,1": "Europe/Moscow",
                          "210,1": "Asia/Tehran",
                          "240,0": "Asia/Dubai",
                          "240,1": "Asia/Baku",
                          "270,0": "Asia/Kabul",
                          "300,1": "Asia/Yekaterinburg",
                          "300,0": "Asia/Karachi",
                          "330,0": "Asia/Kolkata",
                          "345,0": "Asia/Kathmandu",
                          "360,0": "Asia/Dhaka",
                          "360,1": "Asia/Omsk",
                          "390,0": "Asia/Rangoon",
                          "420,1": "Asia/Krasnoyarsk",
                          "420,0": "Asia/Jakarta",
                          "480,0": "Asia/Shanghai",
                          "480,1": "Asia/Irkutsk",
                          "525,0": "Australia/Eucla",
                          "525,1,s": "Australia/Eucla",
                          "540,1": "Asia/Yakutsk",
                          "540,0": "Asia/Tokyo",
                          "570,0": "Australia/Darwin",
                          "570,1,s": "Australia/Adelaide",
                          "600,0": "Australia/Brisbane",
                          "600,1": "Asia/Vladivostok",
                          "600,1,s": "Australia/Sydney",
                          "630,1,s": "Australia/Lord_Howe",
                          "660,1": "Asia/Kamchatka",
                          "660,0": "Pacific/Noumea",
                          "690,0": "Pacific/Norfolk",
                          "720,1,s": "Pacific/Auckland",
                          "720,0": "Pacific/Tarawa",
                          "765,1,s": "Pacific/Chatham",
                          "780,0": "Pacific/Tongatapu",
                          "780,1,s": "Pacific/Apia",
                          "840,0": "Pacific/Kiritimati",
                        }),
                        void 0 !== n ? (n.jstz = s) : (c.jstz = s);
                    },
                    {},
                  ],
                  4: [
                    function (e, t, n) {
                      var r = e("./_getNative")(e("./_root"), "DataView");
                      t.exports = r;
                    },
                    { "./_getNative": 67, "./_root": 104 },
                  ],
                  5: [
                    function (e, t, n) {
                      var r = e("./_hashClear"),
                        a = e("./_hashDelete"),
                        o = e("./_hashGet"),
                        i = e("./_hashHas"),
                        c = e("./_hashSet");
                      function s(e) {
                        var t = -1,
                          n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                          var r = e[t];
                          this.set(r[0], r[1]);
                        }
                      }
                      (s.prototype.clear = r),
                        (s.prototype.delete = a),
                        (s.prototype.get = o),
                        (s.prototype.has = i),
                        (s.prototype.set = c),
                        (t.exports = s);
                    },
                    {
                      "./_hashClear": 74,
                      "./_hashDelete": 75,
                      "./_hashGet": 76,
                      "./_hashHas": 77,
                      "./_hashSet": 78,
                    },
                  ],
                  6: [
                    function (e, t, n) {
                      var r = e("./_listCacheClear"),
                        a = e("./_listCacheDelete"),
                        o = e("./_listCacheGet"),
                        i = e("./_listCacheHas"),
                        c = e("./_listCacheSet");
                      function s(e) {
                        var t = -1,
                          n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                          var r = e[t];
                          this.set(r[0], r[1]);
                        }
                      }
                      (s.prototype.clear = r),
                        (s.prototype.delete = a),
                        (s.prototype.get = o),
                        (s.prototype.has = i),
                        (s.prototype.set = c),
                        (t.exports = s);
                    },
                    {
                      "./_listCacheClear": 86,
                      "./_listCacheDelete": 87,
                      "./_listCacheGet": 88,
                      "./_listCacheHas": 89,
                      "./_listCacheSet": 90,
                    },
                  ],
                  7: [
                    function (e, t, n) {
                      var r = e("./_getNative")(e("./_root"), "Map");
                      t.exports = r;
                    },
                    { "./_getNative": 67, "./_root": 104 },
                  ],
                  8: [
                    function (e, t, n) {
                      var r = e("./_mapCacheClear"),
                        a = e("./_mapCacheDelete"),
                        o = e("./_mapCacheGet"),
                        i = e("./_mapCacheHas"),
                        c = e("./_mapCacheSet");
                      function s(e) {
                        var t = -1,
                          n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                          var r = e[t];
                          this.set(r[0], r[1]);
                        }
                      }
                      (s.prototype.clear = r),
                        (s.prototype.delete = a),
                        (s.prototype.get = o),
                        (s.prototype.has = i),
                        (s.prototype.set = c),
                        (t.exports = s);
                    },
                    {
                      "./_mapCacheClear": 91,
                      "./_mapCacheDelete": 92,
                      "./_mapCacheGet": 93,
                      "./_mapCacheHas": 94,
                      "./_mapCacheSet": 95,
                    },
                  ],
                  9: [
                    function (e, t, n) {
                      var r = e("./_getNative")(e("./_root"), "Promise");
                      t.exports = r;
                    },
                    { "./_getNative": 67, "./_root": 104 },
                  ],
                  10: [
                    function (e, t, n) {
                      var r = e("./_getNative")(e("./_root"), "Set");
                      t.exports = r;
                    },
                    { "./_getNative": 67, "./_root": 104 },
                  ],
                  11: [
                    function (e, t, n) {
                      var r = e("./_MapCache"),
                        a = e("./_setCacheAdd"),
                        o = e("./_setCacheHas");
                      function i(e) {
                        var t = -1,
                          n = null == e ? 0 : e.length;
                        for (this.__data__ = new r(); ++t < n; ) this.add(e[t]);
                      }
                      (i.prototype.add = i.prototype.push = a),
                        (i.prototype.has = o),
                        (t.exports = i);
                    },
                    {
                      "./_MapCache": 8,
                      "./_setCacheAdd": 105,
                      "./_setCacheHas": 106,
                    },
                  ],
                  12: [
                    function (e, t, n) {
                      var r = e("./_ListCache"),
                        a = e("./_stackClear"),
                        o = e("./_stackDelete"),
                        i = e("./_stackGet"),
                        c = e("./_stackHas"),
                        s = e("./_stackSet");
                      function u(e) {
                        var t = (this.__data__ = new r(e));
                        this.size = t.size;
                      }
                      (u.prototype.clear = a),
                        (u.prototype.delete = o),
                        (u.prototype.get = i),
                        (u.prototype.has = c),
                        (u.prototype.set = s),
                        (t.exports = u);
                    },
                    {
                      "./_ListCache": 6,
                      "./_stackClear": 108,
                      "./_stackDelete": 109,
                      "./_stackGet": 110,
                      "./_stackHas": 111,
                      "./_stackSet": 112,
                    },
                  ],
                  13: [
                    function (e, t, n) {
                      var r = e("./_root").Symbol;
                      t.exports = r;
                    },
                    { "./_root": 104 },
                  ],
                  14: [
                    function (e, t, n) {
                      var r = e("./_root").Uint8Array;
                      t.exports = r;
                    },
                    { "./_root": 104 },
                  ],
                  15: [
                    function (e, t, n) {
                      var r = e("./_getNative")(e("./_root"), "WeakMap");
                      t.exports = r;
                    },
                    { "./_getNative": 67, "./_root": 104 },
                  ],
                  16: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        for (
                          var n = -1, r = null == e ? 0 : e.length;
                          ++n < r && !1 !== t(e[n], n, e);

                        );
                        return e;
                      };
                    },
                    {},
                  ],
                  17: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        for (
                          var n = -1, r = null == e ? 0 : e.length;
                          ++n < r;

                        )
                          if (!t(e[n], n, e)) return !1;
                        return !0;
                      };
                    },
                    {},
                  ],
                  18: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        for (
                          var n = -1,
                            r = null == e ? 0 : e.length,
                            a = 0,
                            o = [];
                          ++n < r;

                        ) {
                          var i = e[n];
                          t(i, n, e) && (o[a++] = i);
                        }
                        return o;
                      };
                    },
                    {},
                  ],
                  19: [
                    function (e, t, n) {
                      var l = e("./_baseTimes"),
                        f = e("./isArguments"),
                        d = e("./isArray"),
                        p = e("./isBuffer"),
                        m = e("./_isIndex"),
                        v = e("./isTypedArray"),
                        h = Object.prototype.hasOwnProperty;
                      t.exports = function (e, t) {
                        var n = d(e),
                          r = !n && f(e),
                          a = !n && !r && p(e),
                          o = !n && !r && !a && v(e),
                          i = n || r || a || o,
                          c = i ? l(e.length, String) : [],
                          s = c.length;
                        for (var u in e)
                          (!t && !h.call(e, u)) ||
                            (i &&
                              ("length" == u ||
                                (a && ("offset" == u || "parent" == u)) ||
                                (o &&
                                  ("buffer" == u ||
                                    "byteLength" == u ||
                                    "byteOffset" == u)) ||
                                m(u, s))) ||
                            c.push(u);
                        return c;
                      };
                    },
                    {
                      "./_baseTimes": 49,
                      "./_isIndex": 79,
                      "./isArguments": 127,
                      "./isArray": 128,
                      "./isBuffer": 130,
                      "./isTypedArray": 139,
                    },
                  ],
                  20: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        for (
                          var n = -1,
                            r = null == e ? 0 : e.length,
                            a = Array(r);
                          ++n < r;

                        )
                          a[n] = t(e[n], n, e);
                        return a;
                      };
                    },
                    {},
                  ],
                  21: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        for (var n = -1, r = t.length, a = e.length; ++n < r; )
                          e[a + n] = t[n];
                        return e;
                      };
                    },
                    {},
                  ],
                  22: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        for (
                          var n = -1, r = null == e ? 0 : e.length;
                          ++n < r;

                        )
                          if (t(e[n], n, e)) return !0;
                        return !1;
                      };
                    },
                    {},
                  ],
                  23: [
                    function (e, t, n) {
                      var r = e("./eq");
                      t.exports = function (e, t) {
                        for (var n = e.length; n--; )
                          if (r(e[n][0], t)) return n;
                        return -1;
                      };
                    },
                    { "./eq": 117 },
                  ],
                  24: [
                    function (e, t, n) {
                      var r = e("./_defineProperty");
                      t.exports = function (e, t, n) {
                        "__proto__" == t && r
                          ? r(e, t, {
                              configurable: !0,
                              enumerable: !0,
                              value: n,
                              writable: !0,
                            })
                          : (e[t] = n);
                      };
                    },
                    { "./_defineProperty": 59 },
                  ],
                  25: [
                    function (e, t, n) {
                      var r = e("./_baseForOwn"),
                        a = e("./_createBaseEach")(r);
                      t.exports = a;
                    },
                    { "./_baseForOwn": 30, "./_createBaseEach": 56 },
                  ],
                  26: [
                    function (e, t, n) {
                      var o = e("./_baseEach");
                      t.exports = function (e, r) {
                        var a = !0;
                        return (
                          o(e, function (e, t, n) {
                            return (a = !!r(e, t, n));
                          }),
                          a
                        );
                      };
                    },
                    { "./_baseEach": 25 },
                  ],
                  27: [
                    function (e, t, n) {
                      var o = e("./_baseEach");
                      t.exports = function (e, r) {
                        var a = [];
                        return (
                          o(e, function (e, t, n) {
                            r(e, t, n) && a.push(e);
                          }),
                          a
                        );
                      };
                    },
                    { "./_baseEach": 25 },
                  ],
                  28: [
                    function (e, t, n) {
                      t.exports = function (e, t, n, r) {
                        for (
                          var a = e.length, o = n + (r ? 1 : -1);
                          r ? o-- : ++o < a;

                        )
                          if (t(e[o], o, e)) return o;
                        return -1;
                      };
                    },
                    {},
                  ],
                  29: [
                    function (e, t, n) {
                      var r = e("./_createBaseFor")();
                      t.exports = r;
                    },
                    { "./_createBaseFor": 57 },
                  ],
                  30: [
                    function (e, t, n) {
                      var r = e("./_baseFor"),
                        a = e("./keys");
                      t.exports = function (e, t) {
                        return e && r(e, t, a);
                      };
                    },
                    { "./_baseFor": 29, "./keys": 141 },
                  ],
                  31: [
                    function (e, t, n) {
                      var a = e("./_castPath"),
                        o = e("./_toKey");
                      t.exports = function (e, t) {
                        for (
                          var n = 0, r = (t = a(t, e)).length;
                          null != e && n < r;

                        )
                          e = e[o(t[n++])];
                        return n && n == r ? e : void 0;
                      };
                    },
                    { "./_castPath": 54, "./_toKey": 114 },
                  ],
                  32: [
                    function (e, t, n) {
                      var a = e("./_arrayPush"),
                        o = e("./isArray");
                      t.exports = function (e, t, n) {
                        var r = t(e);
                        return o(e) ? r : a(r, n(e));
                      };
                    },
                    { "./_arrayPush": 21, "./isArray": 128 },
                  ],
                  33: [
                    function (e, t, n) {
                      var r = e("./_Symbol"),
                        a = e("./_getRawTag"),
                        o = e("./_objectToString"),
                        i = r ? r.toStringTag : void 0;
                      t.exports = function (e) {
                        return null == e
                          ? void 0 === e
                            ? "[object Undefined]"
                            : "[object Null]"
                          : i && i in Object(e)
                            ? a(e)
                            : o(e);
                      };
                    },
                    {
                      "./_Symbol": 13,
                      "./_getRawTag": 69,
                      "./_objectToString": 102,
                    },
                  ],
                  34: [
                    function (e, t, n) {
                      var r = Object.prototype.hasOwnProperty;
                      t.exports = function (e, t) {
                        return null != e && r.call(e, t);
                      };
                    },
                    {},
                  ],
                  35: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        return null != e && t in Object(e);
                      };
                    },
                    {},
                  ],
                  36: [
                    function (e, t, n) {
                      var r = e("./_baseGetTag"),
                        a = e("./isObjectLike");
                      t.exports = function (e) {
                        return a(e) && "[object Arguments]" == r(e);
                      };
                    },
                    { "./_baseGetTag": 33, "./isObjectLike": 135 },
                  ],
                  37: [
                    function (e, t, n) {
                      var i = e("./_baseIsEqualDeep"),
                        c = e("./isObjectLike");
                      t.exports = function e(t, n, r, a, o) {
                        return (
                          t === n ||
                          (null == t || null == n || (!c(t) && !c(n))
                            ? t != t && n != n
                            : i(t, n, r, a, e, o))
                        );
                      };
                    },
                    { "./_baseIsEqualDeep": 38, "./isObjectLike": 135 },
                  ],
                  38: [
                    function (e, t, n) {
                      var v = e("./_Stack"),
                        h = e("./_equalArrays"),
                        g = e("./_equalByTag"),
                        y = e("./_equalObjects"),
                        _ = e("./_getTag"),
                        b = e("./isArray"),
                        w = e("./isBuffer"),
                        k = e("./isTypedArray"),
                        A = "[object Arguments]",
                        x = "[object Array]",
                        S = "[object Object]",
                        C = Object.prototype.hasOwnProperty;
                      t.exports = function (e, t, n, r, a, o) {
                        var i = b(e),
                          c = b(t),
                          s = i ? x : _(e),
                          u = c ? x : _(t),
                          l = (s = s == A ? S : s) == S,
                          f = (u = u == A ? S : u) == S,
                          d = s == u;
                        if (d && w(e)) {
                          if (!w(t)) return !1;
                          l = !(i = !0);
                        }
                        if (d && !l)
                          return (
                            (o = o || new v()),
                            i || k(e)
                              ? h(e, t, n, r, a, o)
                              : g(e, t, s, n, r, a, o)
                          );
                        if (!(1 & n)) {
                          var p = l && C.call(e, "__wrapped__"),
                            m = f && C.call(t, "__wrapped__");
                          if (p || m)
                            return a(
                              p ? e.value() : e,
                              m ? t.value() : t,
                              n,
                              r,
                              (o = o || new v())
                            );
                        }
                        return d && ((o = o || new v()), y(e, t, n, r, a, o));
                      };
                    },
                    {
                      "./_Stack": 12,
                      "./_equalArrays": 60,
                      "./_equalByTag": 61,
                      "./_equalObjects": 62,
                      "./_getTag": 71,
                      "./isArray": 128,
                      "./isBuffer": 130,
                      "./isTypedArray": 139,
                    },
                  ],
                  39: [
                    function (e, t, n) {
                      var p = e("./_Stack"),
                        m = e("./_baseIsEqual");
                      t.exports = function (e, t, n, r) {
                        var a = n.length,
                          o = a,
                          i = !r;
                        if (null == e) return !o;
                        for (e = Object(e); a--; ) {
                          var c = n[a];
                          if (i && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
                            return !1;
                        }
                        for (; ++a < o; ) {
                          var s = (c = n[a])[0],
                            u = e[s],
                            l = c[1];
                          if (i && c[2]) {
                            if (void 0 === u && !(s in e)) return !1;
                          } else {
                            var f = new p();
                            if (r) var d = r(u, l, s, e, t, f);
                            if (!(void 0 === d ? m(l, u, 3, r, f) : d))
                              return !1;
                          }
                        }
                        return !0;
                      };
                    },
                    { "./_Stack": 12, "./_baseIsEqual": 37 },
                  ],
                  40: [
                    function (e, t, n) {
                      var r = e("./isFunction"),
                        a = e("./_isMasked"),
                        o = e("./isObject"),
                        i = e("./_toSource"),
                        c = /^\[object .+?Constructor\]$/,
                        s = Function.prototype,
                        u = Object.prototype,
                        l = s.toString,
                        f = u.hasOwnProperty,
                        d = RegExp(
                          "^" +
                            l
                              .call(f)
                              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                              .replace(
                                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                                "$1.*?"
                              ) +
                            "$"
                        );
                      t.exports = function (e) {
                        return !(!o(e) || a(e)) && (r(e) ? d : c).test(i(e));
                      };
                    },
                    {
                      "./_isMasked": 83,
                      "./_toSource": 115,
                      "./isFunction": 132,
                      "./isObject": 134,
                    },
                  ],
                  41: [
                    function (e, t, n) {
                      var r = e("./_baseGetTag"),
                        a = e("./isLength"),
                        o = e("./isObjectLike"),
                        i = {};
                      (i["[object Float32Array]"] =
                        i["[object Float64Array]"] =
                        i["[object Int8Array]"] =
                        i["[object Int16Array]"] =
                        i["[object Int32Array]"] =
                        i["[object Uint8Array]"] =
                        i["[object Uint8ClampedArray]"] =
                        i["[object Uint16Array]"] =
                        i["[object Uint32Array]"] =
                          !0),
                        (i["[object Arguments]"] =
                          i["[object Array]"] =
                          i["[object ArrayBuffer]"] =
                          i["[object Boolean]"] =
                          i["[object DataView]"] =
                          i["[object Date]"] =
                          i["[object Error]"] =
                          i["[object Function]"] =
                          i["[object Map]"] =
                          i["[object Number]"] =
                          i["[object Object]"] =
                          i["[object RegExp]"] =
                          i["[object Set]"] =
                          i["[object String]"] =
                          i["[object WeakMap]"] =
                            !1),
                        (t.exports = function (e) {
                          return o(e) && a(e.length) && !!i[r(e)];
                        });
                    },
                    {
                      "./_baseGetTag": 33,
                      "./isLength": 133,
                      "./isObjectLike": 135,
                    },
                  ],
                  42: [
                    function (e, t, n) {
                      var r = e("./_baseMatches"),
                        a = e("./_baseMatchesProperty"),
                        o = e("./identity"),
                        i = e("./isArray"),
                        c = e("./property");
                      t.exports = function (e) {
                        return "function" == typeof e
                          ? e
                          : null == e
                            ? o
                            : "object" == _typeof(e)
                              ? i(e)
                                ? a(e[0], e[1])
                                : r(e)
                              : c(e);
                      };
                    },
                    {
                      "./_baseMatches": 45,
                      "./_baseMatchesProperty": 46,
                      "./identity": 126,
                      "./isArray": 128,
                      "./property": 145,
                    },
                  ],
                  43: [
                    function (e, t, n) {
                      var r = e("./_isPrototype"),
                        a = e("./_nativeKeys"),
                        o = Object.prototype.hasOwnProperty;
                      t.exports = function (e) {
                        if (!r(e)) return a(e);
                        var t = [];
                        for (var n in Object(e))
                          o.call(e, n) && "constructor" != n && t.push(n);
                        return t;
                      };
                    },
                    { "./_isPrototype": 84, "./_nativeKeys": 100 },
                  ],
                  44: [
                    function (e, t, n) {
                      var i = e("./_baseEach"),
                        c = e("./isArrayLike");
                      t.exports = function (e, r) {
                        var a = -1,
                          o = c(e) ? Array(e.length) : [];
                        return (
                          i(e, function (e, t, n) {
                            o[++a] = r(e, t, n);
                          }),
                          o
                        );
                      };
                    },
                    { "./_baseEach": 25, "./isArrayLike": 129 },
                  ],
                  45: [
                    function (e, t, n) {
                      var r = e("./_baseIsMatch"),
                        a = e("./_getMatchData"),
                        o = e("./_matchesStrictComparable");
                      t.exports = function (t) {
                        var n = a(t);
                        return 1 == n.length && n[0][2]
                          ? o(n[0][0], n[0][1])
                          : function (e) {
                              return e === t || r(e, t, n);
                            };
                      };
                    },
                    {
                      "./_baseIsMatch": 39,
                      "./_getMatchData": 66,
                      "./_matchesStrictComparable": 97,
                    },
                  ],
                  46: [
                    function (e, t, n) {
                      var a = e("./_baseIsEqual"),
                        o = e("./get"),
                        i = e("./hasIn"),
                        c = e("./_isKey"),
                        s = e("./_isStrictComparable"),
                        u = e("./_matchesStrictComparable"),
                        l = e("./_toKey");
                      t.exports = function (n, r) {
                        return c(n) && s(r)
                          ? u(l(n), r)
                          : function (e) {
                              var t = o(e, n);
                              return void 0 === t && t === r
                                ? i(e, n)
                                : a(r, t, 3);
                            };
                      };
                    },
                    {
                      "./_baseIsEqual": 37,
                      "./_isKey": 81,
                      "./_isStrictComparable": 85,
                      "./_matchesStrictComparable": 97,
                      "./_toKey": 114,
                      "./get": 123,
                      "./hasIn": 125,
                    },
                  ],
                  47: [
                    function (e, t, n) {
                      t.exports = function (t) {
                        return function (e) {
                          return null == e ? void 0 : e[t];
                        };
                      };
                    },
                    {},
                  ],
                  48: [
                    function (e, t, n) {
                      var r = e("./_baseGet");
                      t.exports = function (t) {
                        return function (e) {
                          return r(e, t);
                        };
                      };
                    },
                    { "./_baseGet": 31 },
                  ],
                  49: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
                        return r;
                      };
                    },
                    {},
                  ],
                  50: [
                    function (e, t, n) {
                      var r = e("./_Symbol"),
                        a = e("./_arrayMap"),
                        o = e("./isArray"),
                        i = e("./isSymbol"),
                        c = 1 / 0,
                        s = r ? r.prototype : void 0,
                        u = s ? s.toString : void 0;
                      t.exports = function e(t) {
                        if ("string" == typeof t) return t;
                        if (o(t)) return a(t, e) + "";
                        if (i(t)) return u ? u.call(t) : "";
                        var n = t + "";
                        return "0" == n && 1 / t == -c ? "-0" : n;
                      };
                    },
                    {
                      "./_Symbol": 13,
                      "./_arrayMap": 20,
                      "./isArray": 128,
                      "./isSymbol": 138,
                    },
                  ],
                  51: [
                    function (e, t, n) {
                      t.exports = function (t) {
                        return function (e) {
                          return t(e);
                        };
                      };
                    },
                    {},
                  ],
                  52: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        return e.has(t);
                      };
                    },
                    {},
                  ],
                  53: [
                    function (e, t, n) {
                      var r = e("./identity");
                      t.exports = function (e) {
                        return "function" == typeof e ? e : r;
                      };
                    },
                    { "./identity": 126 },
                  ],
                  54: [
                    function (e, t, n) {
                      var r = e("./isArray"),
                        a = e("./_isKey"),
                        o = e("./_stringToPath"),
                        i = e("./toString");
                      t.exports = function (e, t) {
                        return r(e) ? e : a(e, t) ? [e] : o(i(e));
                      };
                    },
                    {
                      "./_isKey": 81,
                      "./_stringToPath": 113,
                      "./isArray": 128,
                      "./toString": 151,
                    },
                  ],
                  55: [
                    function (e, t, n) {
                      var r = e("./_root")["__core-js_shared__"];
                      t.exports = r;
                    },
                    { "./_root": 104 },
                  ],
                  56: [
                    function (e, t, n) {
                      var c = e("./isArrayLike");
                      t.exports = function (o, i) {
                        return function (e, t) {
                          if (null == e) return e;
                          if (!c(e)) return o(e, t);
                          for (
                            var n = e.length, r = i ? n : -1, a = Object(e);
                            (i ? r-- : ++r < n) && !1 !== t(a[r], r, a);

                          );
                          return e;
                        };
                      };
                    },
                    { "./isArrayLike": 129 },
                  ],
                  57: [
                    function (e, t, n) {
                      t.exports = function (s) {
                        return function (e, t, n) {
                          for (
                            var r = -1, a = Object(e), o = n(e), i = o.length;
                            i--;

                          ) {
                            var c = o[s ? i : ++r];
                            if (!1 === t(a[c], c, a)) break;
                          }
                          return e;
                        };
                      };
                    },
                    {},
                  ],
                  58: [
                    function (e, t, n) {
                      var c = e("./_baseIteratee"),
                        s = e("./isArrayLike"),
                        u = e("./keys");
                      t.exports = function (i) {
                        return function (e, t, n) {
                          var r = Object(e);
                          if (!s(e)) {
                            var a = c(t, 3);
                            (e = u(e)),
                              (t = function (e) {
                                return a(r[e], e, r);
                              });
                          }
                          var o = i(e, t, n);
                          return -1 < o ? r[a ? e[o] : o] : void 0;
                        };
                      };
                    },
                    {
                      "./_baseIteratee": 42,
                      "./isArrayLike": 129,
                      "./keys": 141,
                    },
                  ],
                  59: [
                    function (e, t, n) {
                      var r = e("./_getNative"),
                        a = (function () {
                          try {
                            var e = r(Object, "defineProperty");
                            return e({}, "", {}), e;
                          } catch (e) {}
                        })();
                      t.exports = a;
                    },
                    { "./_getNative": 67 },
                  ],
                  60: [
                    function (e, t, n) {
                      var h = e("./_SetCache"),
                        g = e("./_arraySome"),
                        y = e("./_cacheHas");
                      t.exports = function (e, t, n, r, a, o) {
                        var i = 1 & n,
                          c = e.length,
                          s = t.length;
                        if (c != s && !(i && c < s)) return !1;
                        var u = o.get(e);
                        if (u && o.get(t)) return u == t;
                        var l = -1,
                          f = !0,
                          d = 2 & n ? new h() : void 0;
                        for (o.set(e, t), o.set(t, e); ++l < c; ) {
                          var p = e[l],
                            m = t[l];
                          if (r)
                            var v = i
                              ? r(m, p, l, t, e, o)
                              : r(p, m, l, e, t, o);
                          if (void 0 !== v) {
                            if (v) continue;
                            f = !1;
                            break;
                          }
                          if (d) {
                            if (
                              !g(t, function (e, t) {
                                if (!y(d, t) && (p === e || a(p, e, n, r, o)))
                                  return d.push(t);
                              })
                            ) {
                              f = !1;
                              break;
                            }
                          } else if (p !== m && !a(p, m, n, r, o)) {
                            f = !1;
                            break;
                          }
                        }
                        return o.delete(e), o.delete(t), f;
                      };
                    },
                    {
                      "./_SetCache": 11,
                      "./_arraySome": 22,
                      "./_cacheHas": 52,
                    },
                  ],
                  61: [
                    function (e, t, n) {
                      var r = e("./_Symbol"),
                        f = e("./_Uint8Array"),
                        d = e("./eq"),
                        p = e("./_equalArrays"),
                        m = e("./_mapToArray"),
                        v = e("./_setToArray"),
                        a = r ? r.prototype : void 0,
                        h = a ? a.valueOf : void 0;
                      t.exports = function (e, t, n, r, a, o, i) {
                        switch (n) {
                          case "[object DataView]":
                            if (
                              e.byteLength != t.byteLength ||
                              e.byteOffset != t.byteOffset
                            )
                              return !1;
                            (e = e.buffer), (t = t.buffer);
                          case "[object ArrayBuffer]":
                            return !(
                              e.byteLength != t.byteLength ||
                              !o(new f(e), new f(t))
                            );
                          case "[object Boolean]":
                          case "[object Date]":
                          case "[object Number]":
                            return d(+e, +t);
                          case "[object Error]":
                            return e.name == t.name && e.message == t.message;
                          case "[object RegExp]":
                          case "[object String]":
                            return e == t + "";
                          case "[object Map]":
                            var c = m;
                          case "[object Set]":
                            var s = 1 & r;
                            if (((c = c || v), e.size != t.size && !s))
                              return !1;
                            var u = i.get(e);
                            if (u) return u == t;
                            (r |= 2), i.set(e, t);
                            var l = p(c(e), c(t), r, a, o, i);
                            return i.delete(e), l;
                          case "[object Symbol]":
                            if (h) return h.call(e) == h.call(t);
                        }
                        return !1;
                      };
                    },
                    {
                      "./_Symbol": 13,
                      "./_Uint8Array": 14,
                      "./_equalArrays": 60,
                      "./_mapToArray": 96,
                      "./_setToArray": 107,
                      "./eq": 117,
                    },
                  ],
                  62: [
                    function (e, t, n) {
                      var _ = e("./_getAllKeys"),
                        b = Object.prototype.hasOwnProperty;
                      t.exports = function (e, t, n, r, a, o) {
                        var i = 1 & n,
                          c = _(e),
                          s = c.length;
                        if (s != _(t).length && !i) return !1;
                        for (var u = s; u--; ) {
                          var l = c[u];
                          if (!(i ? l in t : b.call(t, l))) return !1;
                        }
                        var f = o.get(e);
                        if (f && o.get(t)) return f == t;
                        var d = !0;
                        o.set(e, t), o.set(t, e);
                        for (var p = i; ++u < s; ) {
                          var m = e[(l = c[u])],
                            v = t[l];
                          if (r)
                            var h = i
                              ? r(v, m, l, t, e, o)
                              : r(m, v, l, e, t, o);
                          if (
                            !(void 0 === h ? m === v || a(m, v, n, r, o) : h)
                          ) {
                            d = !1;
                            break;
                          }
                          p = p || "constructor" == l;
                        }
                        if (d && !p) {
                          var g = e.constructor,
                            y = t.constructor;
                          g != y &&
                            "constructor" in e &&
                            "constructor" in t &&
                            !(
                              "function" == typeof g &&
                              g instanceof g &&
                              "function" == typeof y &&
                              y instanceof y
                            ) &&
                            (d = !1);
                        }
                        return o.delete(e), o.delete(t), d;
                      };
                    },
                    { "./_getAllKeys": 64 },
                  ],
                  63: [
                    function (e, n, t) {
                      (function (e) {
                        var t =
                          "object" == _typeof(e) &&
                          e &&
                          e.Object === Object &&
                          e;
                        n.exports = t;
                      }).call(
                        this,
                        "undefined" != typeof global
                          ? global
                          : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                              ? window
                              : {}
                      );
                    },
                    {},
                  ],
                  64: [
                    function (e, t, n) {
                      var r = e("./_baseGetAllKeys"),
                        a = e("./_getSymbols"),
                        o = e("./keys");
                      t.exports = function (e) {
                        return r(e, o, a);
                      };
                    },
                    {
                      "./_baseGetAllKeys": 32,
                      "./_getSymbols": 70,
                      "./keys": 141,
                    },
                  ],
                  65: [
                    function (e, t, n) {
                      var r = e("./_isKeyable");
                      t.exports = function (e, t) {
                        var n = e.__data__;
                        return r(t)
                          ? n["string" == typeof t ? "string" : "hash"]
                          : n.map;
                      };
                    },
                    { "./_isKeyable": 82 },
                  ],
                  66: [
                    function (e, t, n) {
                      var o = e("./_isStrictComparable"),
                        i = e("./keys");
                      t.exports = function (e) {
                        for (var t = i(e), n = t.length; n--; ) {
                          var r = t[n],
                            a = e[r];
                          t[n] = [r, a, o(a)];
                        }
                        return t;
                      };
                    },
                    { "./_isStrictComparable": 85, "./keys": 141 },
                  ],
                  67: [
                    function (e, t, n) {
                      var r = e("./_baseIsNative"),
                        a = e("./_getValue");
                      t.exports = function (e, t) {
                        var n = a(e, t);
                        return r(n) ? n : void 0;
                      };
                    },
                    { "./_baseIsNative": 40, "./_getValue": 72 },
                  ],
                  68: [
                    function (e, t, n) {
                      var r = e("./_overArg")(Object.getPrototypeOf, Object);
                      t.exports = r;
                    },
                    { "./_overArg": 103 },
                  ],
                  69: [
                    function (e, t, n) {
                      var r = e("./_Symbol"),
                        a = Object.prototype,
                        o = a.hasOwnProperty,
                        i = a.toString,
                        c = r ? r.toStringTag : void 0;
                      t.exports = function (e) {
                        var t = o.call(e, c),
                          n = e[c];
                        try {
                          var r = !(e[c] = void 0);
                        } catch (e) {}
                        var a = i.call(e);
                        return r && (t ? (e[c] = n) : delete e[c]), a;
                      };
                    },
                    { "./_Symbol": 13 },
                  ],
                  70: [
                    function (e, t, n) {
                      var r = e("./_arrayFilter"),
                        a = e("./stubArray"),
                        o = Object.prototype.propertyIsEnumerable,
                        i = Object.getOwnPropertySymbols,
                        c = i
                          ? function (t) {
                              return null == t
                                ? []
                                : ((t = Object(t)),
                                  r(i(t), function (e) {
                                    return o.call(t, e);
                                  }));
                            }
                          : a;
                      t.exports = c;
                    },
                    { "./_arrayFilter": 18, "./stubArray": 146 },
                  ],
                  71: [
                    function (e, t, n) {
                      var r = e("./_DataView"),
                        a = e("./_Map"),
                        o = e("./_Promise"),
                        i = e("./_Set"),
                        c = e("./_WeakMap"),
                        s = e("./_baseGetTag"),
                        u = e("./_toSource"),
                        l = "[object Map]",
                        f = "[object Promise]",
                        d = "[object Set]",
                        p = "[object WeakMap]",
                        m = "[object DataView]",
                        v = u(r),
                        h = u(a),
                        g = u(o),
                        y = u(i),
                        _ = u(c),
                        b = s;
                      ((r && b(new r(new ArrayBuffer(1))) != m) ||
                        (a && b(new a()) != l) ||
                        (o && b(o.resolve()) != f) ||
                        (i && b(new i()) != d) ||
                        (c && b(new c()) != p)) &&
                        (b = function (e) {
                          var t = s(e),
                            n = "[object Object]" == t ? e.constructor : void 0,
                            r = n ? u(n) : "";
                          if (r)
                            switch (r) {
                              case v:
                                return m;
                              case h:
                                return l;
                              case g:
                                return f;
                              case y:
                                return d;
                              case _:
                                return p;
                            }
                          return t;
                        }),
                        (t.exports = b);
                    },
                    {
                      "./_DataView": 4,
                      "./_Map": 7,
                      "./_Promise": 9,
                      "./_Set": 10,
                      "./_WeakMap": 15,
                      "./_baseGetTag": 33,
                      "./_toSource": 115,
                    },
                  ],
                  72: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        return null == e ? void 0 : e[t];
                      };
                    },
                    {},
                  ],
                  73: [
                    function (e, t, n) {
                      var c = e("./_castPath"),
                        s = e("./isArguments"),
                        u = e("./isArray"),
                        l = e("./_isIndex"),
                        f = e("./isLength"),
                        d = e("./_toKey");
                      t.exports = function (e, t, n) {
                        for (
                          var r = -1, a = (t = c(t, e)).length, o = !1;
                          ++r < a;

                        ) {
                          var i = d(t[r]);
                          if (!(o = null != e && n(e, i))) break;
                          e = e[i];
                        }
                        return o || ++r != a
                          ? o
                          : !!(a = null == e ? 0 : e.length) &&
                              f(a) &&
                              l(i, a) &&
                              (u(e) || s(e));
                      };
                    },
                    {
                      "./_castPath": 54,
                      "./_isIndex": 79,
                      "./_toKey": 114,
                      "./isArguments": 127,
                      "./isArray": 128,
                      "./isLength": 133,
                    },
                  ],
                  74: [
                    function (e, t, n) {
                      var r = e("./_nativeCreate");
                      t.exports = function () {
                        (this.__data__ = r ? r(null) : {}), (this.size = 0);
                      };
                    },
                    { "./_nativeCreate": 99 },
                  ],
                  75: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        var t = this.has(e) && delete this.__data__[e];
                        return (this.size -= t ? 1 : 0), t;
                      };
                    },
                    {},
                  ],
                  76: [
                    function (e, t, n) {
                      var r = e("./_nativeCreate"),
                        a = Object.prototype.hasOwnProperty;
                      t.exports = function (e) {
                        var t = this.__data__;
                        if (r) {
                          var n = t[e];
                          return "__lodash_hash_undefined__" === n ? void 0 : n;
                        }
                        return a.call(t, e) ? t[e] : void 0;
                      };
                    },
                    { "./_nativeCreate": 99 },
                  ],
                  77: [
                    function (e, t, n) {
                      var r = e("./_nativeCreate"),
                        a = Object.prototype.hasOwnProperty;
                      t.exports = function (e) {
                        var t = this.__data__;
                        return r ? void 0 !== t[e] : a.call(t, e);
                      };
                    },
                    { "./_nativeCreate": 99 },
                  ],
                  78: [
                    function (e, t, n) {
                      var r = e("./_nativeCreate");
                      t.exports = function (e, t) {
                        var n = this.__data__;
                        return (
                          (this.size += this.has(e) ? 0 : 1),
                          (n[e] =
                            r && void 0 === t
                              ? "__lodash_hash_undefined__"
                              : t),
                          this
                        );
                      };
                    },
                    { "./_nativeCreate": 99 },
                  ],
                  79: [
                    function (e, t, n) {
                      var r = /^(?:0|[1-9]\d*)$/;
                      t.exports = function (e, t) {
                        var n = _typeof(e);
                        return (
                          !!(t = null == t ? 9007199254740991 : t) &&
                          ("number" == n || ("symbol" != n && r.test(e))) &&
                          -1 < e &&
                          e % 1 == 0 &&
                          e < t
                        );
                      };
                    },
                    {},
                  ],
                  80: [
                    function (e, t, n) {
                      var a = e("./eq"),
                        o = e("./isArrayLike"),
                        i = e("./_isIndex"),
                        c = e("./isObject");
                      t.exports = function (e, t, n) {
                        if (!c(n)) return !1;
                        var r = _typeof(t);
                        return (
                          !!("number" == r
                            ? o(n) && i(t, n.length)
                            : "string" == r && t in n) && a(n[t], e)
                        );
                      };
                    },
                    {
                      "./_isIndex": 79,
                      "./eq": 117,
                      "./isArrayLike": 129,
                      "./isObject": 134,
                    },
                  ],
                  81: [
                    function (e, t, n) {
                      var r = e("./isArray"),
                        a = e("./isSymbol"),
                        o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                        i = /^\w*$/;
                      t.exports = function (e, t) {
                        if (r(e)) return !1;
                        var n = _typeof(e);
                        return (
                          !(
                            "number" != n &&
                            "symbol" != n &&
                            "boolean" != n &&
                            null != e &&
                            !a(e)
                          ) ||
                          i.test(e) ||
                          !o.test(e) ||
                          (null != t && e in Object(t))
                        );
                      };
                    },
                    { "./isArray": 128, "./isSymbol": 138 },
                  ],
                  82: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        var t = _typeof(e);
                        return "string" == t ||
                          "number" == t ||
                          "symbol" == t ||
                          "boolean" == t
                          ? "__proto__" !== e
                          : null === e;
                      };
                    },
                    {},
                  ],
                  83: [
                    function (e, t, n) {
                      var r,
                        a = e("./_coreJsData"),
                        o = (r = /[^.]+$/.exec(
                          (a && a.keys && a.keys.IE_PROTO) || ""
                        ))
                          ? "Symbol(src)_1." + r
                          : "";
                      t.exports = function (e) {
                        return !!o && o in e;
                      };
                    },
                    { "./_coreJsData": 55 },
                  ],
                  84: [
                    function (e, t, n) {
                      var r = Object.prototype;
                      t.exports = function (e) {
                        var t = e && e.constructor;
                        return (
                          e === (("function" == typeof t && t.prototype) || r)
                        );
                      };
                    },
                    {},
                  ],
                  85: [
                    function (e, t, n) {
                      var r = e("./isObject");
                      t.exports = function (e) {
                        return e == e && !r(e);
                      };
                    },
                    { "./isObject": 134 },
                  ],
                  86: [
                    function (e, t, n) {
                      t.exports = function () {
                        (this.__data__ = []), (this.size = 0);
                      };
                    },
                    {},
                  ],
                  87: [
                    function (e, t, n) {
                      var r = e("./_assocIndexOf"),
                        a = Array.prototype.splice;
                      t.exports = function (e) {
                        var t = this.__data__,
                          n = r(t, e);
                        return (
                          !(n < 0) &&
                          (n == t.length - 1 ? t.pop() : a.call(t, n, 1),
                          --this.size,
                          !0)
                        );
                      };
                    },
                    { "./_assocIndexOf": 23 },
                  ],
                  88: [
                    function (e, t, n) {
                      var r = e("./_assocIndexOf");
                      t.exports = function (e) {
                        var t = this.__data__,
                          n = r(t, e);
                        return n < 0 ? void 0 : t[n][1];
                      };
                    },
                    { "./_assocIndexOf": 23 },
                  ],
                  89: [
                    function (e, t, n) {
                      var r = e("./_assocIndexOf");
                      t.exports = function (e) {
                        return -1 < r(this.__data__, e);
                      };
                    },
                    { "./_assocIndexOf": 23 },
                  ],
                  90: [
                    function (e, t, n) {
                      var a = e("./_assocIndexOf");
                      t.exports = function (e, t) {
                        var n = this.__data__,
                          r = a(n, e);
                        return (
                          r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t),
                          this
                        );
                      };
                    },
                    { "./_assocIndexOf": 23 },
                  ],
                  91: [
                    function (e, t, n) {
                      var r = e("./_Hash"),
                        a = e("./_ListCache"),
                        o = e("./_Map");
                      t.exports = function () {
                        (this.size = 0),
                          (this.__data__ = {
                            hash: new r(),
                            map: new (o || a)(),
                            string: new r(),
                          });
                      };
                    },
                    { "./_Hash": 5, "./_ListCache": 6, "./_Map": 7 },
                  ],
                  92: [
                    function (e, t, n) {
                      var r = e("./_getMapData");
                      t.exports = function (e) {
                        var t = r(this, e).delete(e);
                        return (this.size -= t ? 1 : 0), t;
                      };
                    },
                    { "./_getMapData": 65 },
                  ],
                  93: [
                    function (e, t, n) {
                      var r = e("./_getMapData");
                      t.exports = function (e) {
                        return r(this, e).get(e);
                      };
                    },
                    { "./_getMapData": 65 },
                  ],
                  94: [
                    function (e, t, n) {
                      var r = e("./_getMapData");
                      t.exports = function (e) {
                        return r(this, e).has(e);
                      };
                    },
                    { "./_getMapData": 65 },
                  ],
                  95: [
                    function (e, t, n) {
                      var a = e("./_getMapData");
                      t.exports = function (e, t) {
                        var n = a(this, e),
                          r = n.size;
                        return (
                          n.set(e, t), (this.size += n.size == r ? 0 : 1), this
                        );
                      };
                    },
                    { "./_getMapData": 65 },
                  ],
                  96: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        var n = -1,
                          r = Array(e.size);
                        return (
                          e.forEach(function (e, t) {
                            r[++n] = [t, e];
                          }),
                          r
                        );
                      };
                    },
                    {},
                  ],
                  97: [
                    function (e, t, n) {
                      t.exports = function (t, n) {
                        return function (e) {
                          return (
                            null != e &&
                            e[t] === n &&
                            (void 0 !== n || t in Object(e))
                          );
                        };
                      };
                    },
                    {},
                  ],
                  98: [
                    function (e, t, n) {
                      var r = e("./memoize");
                      t.exports = function (e) {
                        var t = r(e, function (e) {
                            return 500 === n.size && n.clear(), e;
                          }),
                          n = t.cache;
                        return t;
                      };
                    },
                    { "./memoize": 144 },
                  ],
                  99: [
                    function (e, t, n) {
                      var r = e("./_getNative")(Object, "create");
                      t.exports = r;
                    },
                    { "./_getNative": 67 },
                  ],
                  100: [
                    function (e, t, n) {
                      var r = e("./_overArg")(Object.keys, Object);
                      t.exports = r;
                    },
                    { "./_overArg": 103 },
                  ],
                  101: [
                    function (e, t, n) {
                      var r = e("./_freeGlobal"),
                        a = "object" == _typeof(n) && n && !n.nodeType && n,
                        o =
                          a && "object" == _typeof(t) && t && !t.nodeType && t,
                        i = o && o.exports === a && r.process,
                        c = (function () {
                          try {
                            var e = o && o.require && o.require("util").types;
                            return e || (i && i.binding && i.binding("util"));
                          } catch (e) {}
                        })();
                      t.exports = c;
                    },
                    { "./_freeGlobal": 63 },
                  ],
                  102: [
                    function (e, t, n) {
                      var r = Object.prototype.toString;
                      t.exports = function (e) {
                        return r.call(e);
                      };
                    },
                    {},
                  ],
                  103: [
                    function (e, t, n) {
                      t.exports = function (t, n) {
                        return function (e) {
                          return t(n(e));
                        };
                      };
                    },
                    {},
                  ],
                  104: [
                    function (e, t, n) {
                      var r = e("./_freeGlobal"),
                        a =
                          "object" ==
                            ("undefined" == typeof self
                              ? "undefined"
                              : _typeof(self)) &&
                          self &&
                          self.Object === Object &&
                          self,
                        o = r || a || Function("return this")();
                      t.exports = o;
                    },
                    { "./_freeGlobal": 63 },
                  ],
                  105: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return (
                          this.__data__.set(e, "__lodash_hash_undefined__"),
                          this
                        );
                      };
                    },
                    {},
                  ],
                  106: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return this.__data__.has(e);
                      };
                    },
                    {},
                  ],
                  107: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        var t = -1,
                          n = Array(e.size);
                        return (
                          e.forEach(function (e) {
                            n[++t] = e;
                          }),
                          n
                        );
                      };
                    },
                    {},
                  ],
                  108: [
                    function (e, t, n) {
                      var r = e("./_ListCache");
                      t.exports = function () {
                        (this.__data__ = new r()), (this.size = 0);
                      };
                    },
                    { "./_ListCache": 6 },
                  ],
                  109: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        var t = this.__data__,
                          n = t.delete(e);
                        return (this.size = t.size), n;
                      };
                    },
                    {},
                  ],
                  110: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return this.__data__.get(e);
                      };
                    },
                    {},
                  ],
                  111: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return this.__data__.has(e);
                      };
                    },
                    {},
                  ],
                  112: [
                    function (e, t, n) {
                      var a = e("./_ListCache"),
                        o = e("./_Map"),
                        i = e("./_MapCache");
                      t.exports = function (e, t) {
                        var n = this.__data__;
                        if (n instanceof a) {
                          var r = n.__data__;
                          if (!o || r.length < 199)
                            return r.push([e, t]), (this.size = ++n.size), this;
                          n = this.__data__ = new i(r);
                        }
                        return n.set(e, t), (this.size = n.size), this;
                      };
                    },
                    { "./_ListCache": 6, "./_Map": 7, "./_MapCache": 8 },
                  ],
                  113: [
                    function (e, t, n) {
                      var r = e("./_memoizeCapped"),
                        o =
                          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                        i = /\\(\\)?/g,
                        a = r(function (e) {
                          var a = [];
                          return (
                            46 === e.charCodeAt(0) && a.push(""),
                            e.replace(o, function (e, t, n, r) {
                              a.push(n ? r.replace(i, "$1") : t || e);
                            }),
                            a
                          );
                        });
                      t.exports = a;
                    },
                    { "./_memoizeCapped": 98 },
                  ],
                  114: [
                    function (e, t, n) {
                      var r = e("./isSymbol");
                      t.exports = function (e) {
                        if ("string" == typeof e || r(e)) return e;
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
                      };
                    },
                    { "./isSymbol": 138 },
                  ],
                  115: [
                    function (e, t, n) {
                      var r = Function.prototype.toString;
                      t.exports = function (e) {
                        if (null != e) {
                          try {
                            return r.call(e);
                          } catch (e) {}
                          try {
                            return e + "";
                          } catch (e) {}
                        }
                        return "";
                      };
                    },
                    {},
                  ],
                  116: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        for (
                          var t = -1,
                            n = null == e ? 0 : e.length,
                            r = 0,
                            a = [];
                          ++t < n;

                        ) {
                          var o = e[t];
                          o && (a[r++] = o);
                        }
                        return a;
                      };
                    },
                    {},
                  ],
                  117: [
                    function (e, t, n) {
                      t.exports = function (e, t) {
                        return e === t || (e != e && t != t);
                      };
                    },
                    {},
                  ],
                  118: [
                    function (e, t, n) {
                      var a = e("./_arrayEvery"),
                        o = e("./_baseEvery"),
                        i = e("./_baseIteratee"),
                        c = e("./isArray"),
                        s = e("./_isIterateeCall");
                      t.exports = function (e, t, n) {
                        var r = c(e) ? a : o;
                        return n && s(e, t, n) && (t = void 0), r(e, i(t, 3));
                      };
                    },
                    {
                      "./_arrayEvery": 17,
                      "./_baseEvery": 26,
                      "./_baseIteratee": 42,
                      "./_isIterateeCall": 80,
                      "./isArray": 128,
                    },
                  ],
                  119: [
                    function (e, t, n) {
                      var r = e("./_arrayFilter"),
                        a = e("./_baseFilter"),
                        o = e("./_baseIteratee"),
                        i = e("./isArray");
                      t.exports = function (e, t) {
                        return (i(e) ? r : a)(e, o(t, 3));
                      };
                    },
                    {
                      "./_arrayFilter": 18,
                      "./_baseFilter": 27,
                      "./_baseIteratee": 42,
                      "./isArray": 128,
                    },
                  ],
                  120: [
                    function (e, t, n) {
                      var r = e("./_createFind")(e("./findIndex"));
                      t.exports = r;
                    },
                    { "./_createFind": 58, "./findIndex": 121 },
                  ],
                  121: [
                    function (e, t, n) {
                      var o = e("./_baseFindIndex"),
                        i = e("./_baseIteratee"),
                        c = e("./toInteger"),
                        s = Math.max;
                      t.exports = function (e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r) return -1;
                        var a = null == n ? 0 : c(n);
                        return a < 0 && (a = s(r + a, 0)), o(e, i(t, 3), a);
                      };
                    },
                    {
                      "./_baseFindIndex": 28,
                      "./_baseIteratee": 42,
                      "./toInteger": 149,
                    },
                  ],
                  122: [
                    function (e, t, n) {
                      var r = e("./_arrayEach"),
                        a = e("./_baseEach"),
                        o = e("./_castFunction"),
                        i = e("./isArray");
                      t.exports = function (e, t) {
                        return (i(e) ? r : a)(e, o(t));
                      };
                    },
                    {
                      "./_arrayEach": 16,
                      "./_baseEach": 25,
                      "./_castFunction": 53,
                      "./isArray": 128,
                    },
                  ],
                  123: [
                    function (e, t, n) {
                      var a = e("./_baseGet");
                      t.exports = function (e, t, n) {
                        var r = null == e ? void 0 : a(e, t);
                        return void 0 === r ? n : r;
                      };
                    },
                    { "./_baseGet": 31 },
                  ],
                  124: [
                    function (e, t, n) {
                      var r = e("./_baseHas"),
                        a = e("./_hasPath");
                      t.exports = function (e, t) {
                        return null != e && a(e, t, r);
                      };
                    },
                    { "./_baseHas": 34, "./_hasPath": 73 },
                  ],
                  125: [
                    function (e, t, n) {
                      var r = e("./_baseHasIn"),
                        a = e("./_hasPath");
                      t.exports = function (e, t) {
                        return null != e && a(e, t, r);
                      };
                    },
                    { "./_baseHasIn": 35, "./_hasPath": 73 },
                  ],
                  126: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return e;
                      };
                    },
                    {},
                  ],
                  127: [
                    function (e, t, n) {
                      var r = e("./_baseIsArguments"),
                        a = e("./isObjectLike"),
                        o = Object.prototype,
                        i = o.hasOwnProperty,
                        c = o.propertyIsEnumerable,
                        s = r(
                          (function () {
                            return arguments;
                          })()
                        )
                          ? r
                          : function (e) {
                              return (
                                a(e) &&
                                i.call(e, "callee") &&
                                !c.call(e, "callee")
                              );
                            };
                      t.exports = s;
                    },
                    { "./_baseIsArguments": 36, "./isObjectLike": 135 },
                  ],
                  128: [
                    function (e, t, n) {
                      var r = Array.isArray;
                      t.exports = r;
                    },
                    {},
                  ],
                  129: [
                    function (e, t, n) {
                      var r = e("./isFunction"),
                        a = e("./isLength");
                      t.exports = function (e) {
                        return null != e && a(e.length) && !r(e);
                      };
                    },
                    { "./isFunction": 132, "./isLength": 133 },
                  ],
                  130: [
                    function (e, t, n) {
                      var r = e("./_root"),
                        a = e("./stubFalse"),
                        o = "object" == _typeof(n) && n && !n.nodeType && n,
                        i =
                          o && "object" == _typeof(t) && t && !t.nodeType && t,
                        c = i && i.exports === o ? r.Buffer : void 0,
                        s = (c ? c.isBuffer : void 0) || a;
                      t.exports = s;
                    },
                    { "./_root": 104, "./stubFalse": 147 },
                  ],
                  131: [
                    function (e, t, n) {
                      var r = e("./_baseIsEqual");
                      t.exports = function (e, t) {
                        return r(e, t);
                      };
                    },
                    { "./_baseIsEqual": 37 },
                  ],
                  132: [
                    function (e, t, n) {
                      var r = e("./_baseGetTag"),
                        a = e("./isObject");
                      t.exports = function (e) {
                        if (!a(e)) return !1;
                        var t = r(e);
                        return (
                          "[object Function]" == t ||
                          "[object GeneratorFunction]" == t ||
                          "[object AsyncFunction]" == t ||
                          "[object Proxy]" == t
                        );
                      };
                    },
                    { "./_baseGetTag": 33, "./isObject": 134 },
                  ],
                  133: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return (
                          "number" == typeof e &&
                          -1 < e &&
                          e % 1 == 0 &&
                          e <= 9007199254740991
                        );
                      };
                    },
                    {},
                  ],
                  134: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        var t = _typeof(e);
                        return null != e && ("object" == t || "function" == t);
                      };
                    },
                    {},
                  ],
                  135: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return null != e && "object" == _typeof(e);
                      };
                    },
                    {},
                  ],
                  136: [
                    function (e, t, n) {
                      var r = e("./_baseGetTag"),
                        a = e("./_getPrototype"),
                        o = e("./isObjectLike"),
                        i = Function.prototype,
                        c = Object.prototype,
                        s = i.toString,
                        u = c.hasOwnProperty,
                        l = s.call(Object);
                      t.exports = function (e) {
                        if (!o(e) || "[object Object]" != r(e)) return !1;
                        var t = a(e);
                        if (null === t) return !0;
                        var n = u.call(t, "constructor") && t.constructor;
                        return (
                          "function" == typeof n &&
                          n instanceof n &&
                          s.call(n) == l
                        );
                      };
                    },
                    {
                      "./_baseGetTag": 33,
                      "./_getPrototype": 68,
                      "./isObjectLike": 135,
                    },
                  ],
                  137: [
                    function (e, t, n) {
                      var r = e("./_baseGetTag"),
                        a = e("./isArray"),
                        o = e("./isObjectLike");
                      t.exports = function (e) {
                        return (
                          "string" == typeof e ||
                          (!a(e) && o(e) && "[object String]" == r(e))
                        );
                      };
                    },
                    {
                      "./_baseGetTag": 33,
                      "./isArray": 128,
                      "./isObjectLike": 135,
                    },
                  ],
                  138: [
                    function (e, t, n) {
                      var r = e("./_baseGetTag"),
                        a = e("./isObjectLike");
                      t.exports = function (e) {
                        return (
                          "symbol" == _typeof(e) ||
                          (a(e) && "[object Symbol]" == r(e))
                        );
                      };
                    },
                    { "./_baseGetTag": 33, "./isObjectLike": 135 },
                  ],
                  139: [
                    function (e, t, n) {
                      var r = e("./_baseIsTypedArray"),
                        a = e("./_baseUnary"),
                        o = e("./_nodeUtil"),
                        i = o && o.isTypedArray,
                        c = i ? a(i) : r;
                      t.exports = c;
                    },
                    {
                      "./_baseIsTypedArray": 41,
                      "./_baseUnary": 51,
                      "./_nodeUtil": 101,
                    },
                  ],
                  140: [
                    function (e, t, n) {
                      t.exports = function (e) {
                        return void 0 === e;
                      };
                    },
                    {},
                  ],
                  141: [
                    function (e, t, n) {
                      var r = e("./_arrayLikeKeys"),
                        a = e("./_baseKeys"),
                        o = e("./isArrayLike");
                      t.exports = function (e) {
                        return o(e) ? r(e) : a(e);
                      };
                    },
                    {
                      "./_arrayLikeKeys": 19,
                      "./_baseKeys": 43,
                      "./isArrayLike": 129,
                    },
                  ],
                  142: [
                    function (e, t, n) {
                      var r = e("./_arrayMap"),
                        a = e("./_baseIteratee"),
                        o = e("./_baseMap"),
                        i = e("./isArray");
                      t.exports = function (e, t) {
                        return (i(e) ? r : o)(e, a(t, 3));
                      };
                    },
                    {
                      "./_arrayMap": 20,
                      "./_baseIteratee": 42,
                      "./_baseMap": 44,
                      "./isArray": 128,
                    },
                  ],
                  143: [
                    function (e, t, n) {
                      var o = e("./_baseAssignValue"),
                        i = e("./_baseForOwn"),
                        c = e("./_baseIteratee");
                      t.exports = function (e, r) {
                        var a = {};
                        return (
                          (r = c(r, 3)),
                          i(e, function (e, t, n) {
                            o(a, t, r(e, t, n));
                          }),
                          a
                        );
                      };
                    },
                    {
                      "./_baseAssignValue": 24,
                      "./_baseForOwn": 30,
                      "./_baseIteratee": 42,
                    },
                  ],
                  144: [
                    function (e, t, n) {
                      var r = e("./_MapCache"),
                        c = "Expected a function";
                      function s(a, o) {
                        if (
                          "function" != typeof a ||
                          (null != o && "function" != typeof o)
                        )
                          throw new TypeError(c);
                        function i() {
                          var e = arguments,
                            t = o ? o.apply(this, e) : e[0],
                            n = i.cache;
                          if (n.has(t)) return n.get(t);
                          var r = a.apply(this, e);
                          return (i.cache = n.set(t, r) || n), r;
                        }
                        return (i.cache = new (s.Cache || r)()), i;
                      }
                      (s.Cache = r), (t.exports = s);
                    },
                    { "./_MapCache": 8 },
                  ],
                  145: [
                    function (e, t, n) {
                      var r = e("./_baseProperty"),
                        a = e("./_basePropertyDeep"),
                        o = e("./_isKey"),
                        i = e("./_toKey");
                      t.exports = function (e) {
                        return o(e) ? r(i(e)) : a(e);
                      };
                    },
                    {
                      "./_baseProperty": 47,
                      "./_basePropertyDeep": 48,
                      "./_isKey": 81,
                      "./_toKey": 114,
                    },
                  ],
                  146: [
                    function (e, t, n) {
                      t.exports = function () {
                        return [];
                      };
                    },
                    {},
                  ],
                  147: [
                    function (e, t, n) {
                      t.exports = function () {
                        return !1;
                      };
                    },
                    {},
                  ],
                  148: [
                    function (e, t, n) {
                      var r = e("./toNumber");
                      t.exports = function (e) {
                        return e
                          ? (e = r(e)) !== 1 / 0 && e !== -1 / 0
                            ? e == e
                              ? e
                              : 0
                            : 17976931348623157e292 * (e < 0 ? -1 : 1)
                          : 0 === e
                            ? e
                            : 0;
                      };
                    },
                    { "./toNumber": 150 },
                  ],
                  149: [
                    function (e, t, n) {
                      var r = e("./toFinite");
                      t.exports = function (e) {
                        var t = r(e),
                          n = t % 1;
                        return t == t ? (n ? t - n : t) : 0;
                      };
                    },
                    { "./toFinite": 148 },
                  ],
                  150: [
                    function (e, t, n) {
                      var r = e("./isObject"),
                        a = e("./isSymbol"),
                        o = /^\s+|\s+$/g,
                        i = /^[-+]0x[0-9a-f]+$/i,
                        c = /^0b[01]+$/i,
                        s = /^0o[0-7]+$/i,
                        u = parseInt;
                      t.exports = function (e) {
                        if ("number" == typeof e) return e;
                        if (a(e)) return NaN;
                        if (r(e)) {
                          var t =
                            "function" == typeof e.valueOf ? e.valueOf() : e;
                          e = r(t) ? t + "" : t;
                        }
                        if ("string" != typeof e) return 0 === e ? e : +e;
                        e = e.replace(o, "");
                        var n = c.test(e);
                        return n || s.test(e)
                          ? u(e.slice(2), n ? 2 : 8)
                          : i.test(e)
                            ? NaN
                            : +e;
                      };
                    },
                    { "./isObject": 134, "./isSymbol": 138 },
                  ],
                  151: [
                    function (e, t, n) {
                      var r = e("./_baseToString");
                      t.exports = function (e) {
                        return null == e ? "" : r(e);
                      };
                    },
                    { "./_baseToString": 50 },
                  ],
                  152: [
                    function (e, t, n) {
                      function r(e, t) {
                        var n = y.wordsToBytes(
                          (function (e) {
                            e.constructor == String && (e = _.stringToBytes(e));
                            var t = y.bytesToWords(e),
                              n = 8 * e.length,
                              r = [],
                              a = 1732584193,
                              o = -271733879,
                              i = -1732584194,
                              c = 271733878,
                              s = -1009589776;
                            (t[n >> 5] |= 128 << (24 - (n % 32))),
                              (t[15 + (((64 + n) >>> 9) << 4)] = n);
                            for (var u = 0; u < t.length; u += 16) {
                              for (
                                var l = a, f = o, d = i, p = c, m = s, v = 0;
                                v < 80;
                                v++
                              ) {
                                if (v < 16) r[v] = t[u + v];
                                else {
                                  var h =
                                    r[v - 3] ^ r[v - 8] ^ r[v - 14] ^ r[v - 16];
                                  r[v] = (h << 1) | (h >>> 31);
                                }
                                var g =
                                  ((a << 5) | (a >>> 27)) +
                                  s +
                                  (r[v] >>> 0) +
                                  (v < 20
                                    ? 1518500249 + ((o & i) | (~o & c))
                                    : v < 40
                                      ? 1859775393 + (o ^ i ^ c)
                                      : v < 60
                                        ? ((o & i) | (o & c) | (i & c)) -
                                          1894007588
                                        : (o ^ i ^ c) - 899497514);
                                (s = c),
                                  (c = i),
                                  (i = (o << 30) | (o >>> 2)),
                                  (o = a),
                                  (a = g);
                              }
                              (a += l), (o += f), (i += d), (c += p), (s += m);
                            }
                            return [a, o, i, c, s];
                          })(e)
                        );
                        return t && t.asBytes
                          ? n
                          : t && t.asString
                            ? a.bytesToString(n)
                            : y.bytesToHex(n);
                      }
                      var y, _, a;
                      (y = e("crypt")),
                        (_ = e("charenc").utf8),
                        (a = e("charenc").bin),
                        (r._blocksize = 16),
                        (r._digestsize = 20),
                        (t.exports = r);
                    },
                    { charenc: 1, crypt: 2 },
                  ],
                  153: [
                    function (e, t, n) {
                      Object.defineProperty(n, "__esModule", { value: !0 });
                      var r = e("./lib/core");
                      n.trackerCore = r.trackerCore;
                    },
                    { "./lib/core": 156 },
                  ],
                  154: [
                    function (e, t, n) {
                      function r(e) {
                        var t,
                          n,
                          r,
                          a,
                          o,
                          i,
                          c,
                          s =
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                          u = 0,
                          l = 0,
                          f = "",
                          d = [];
                        if (!e) return e;
                        for (
                          e += "";
                          (t =
                            ((i =
                              (s.indexOf(e.charAt(u++)) << 18) |
                              (s.indexOf(e.charAt(u++)) << 12) |
                              ((a = s.indexOf(e.charAt(u++))) << 6) |
                              (o = s.indexOf(e.charAt(u++)))) >>
                              16) &
                            255),
                            (n = (i >> 8) & 255),
                            (r = 255 & i),
                            (d[l++] =
                              64 === a
                                ? String.fromCharCode(t)
                                : 64 === o
                                  ? String.fromCharCode(t, n)
                                  : String.fromCharCode(t, n, r)),
                            u < e.length;

                        );
                        return (
                          (f = d.join("")),
                          (c = f.replace(/\0+$/, "")),
                          decodeURIComponent(
                            c
                              .split("")
                              .map(function (e) {
                                return (
                                  "%" +
                                  ("00" + e.charCodeAt(0).toString(16)).slice(
                                    -2
                                  )
                                );
                              })
                              .join("")
                          )
                        );
                      }
                      Object.defineProperty(n, "__esModule", { value: !0 }),
                        (n.base64urldecode = function (e) {
                          if (!e) return e;
                          switch (4 - (e.length % 4)) {
                            case 2:
                              e += "==";
                              break;
                            case 3:
                              e += "=";
                          }
                          return r(e.replace(/-/g, "+").replace(/_/g, "/"));
                        }),
                        (n.base64encode = function (e) {
                          var t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c =
                              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                            s = 0,
                            u = 0,
                            l = [];
                          if (!e) return e;
                          for (
                            e = unescape(encodeURIComponent(e));
                            (t =
                              ((o =
                                (e.charCodeAt(s++) << 16) |
                                (e.charCodeAt(s++) << 8) |
                                e.charCodeAt(s++)) >>
                                18) &
                              63),
                              (n = (o >> 12) & 63),
                              (r = (o >> 6) & 63),
                              (a = 63 & o),
                              (l[u++] =
                                c.charAt(t) +
                                c.charAt(n) +
                                c.charAt(r) +
                                c.charAt(a)),
                              s < e.length;

                          );
                          i = l.join("");
                          var f = e.length % 3;
                          return (
                            (f ? i.slice(0, f - 3) : i) + "===".slice(f || 3)
                          );
                        }),
                        (n.base64decode = r);
                    },
                    {},
                  ],
                  155: [
                    function (e, t, n) {
                      var r =
                        (this && this.__assign) ||
                        Object.assign ||
                        function (e) {
                          for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in (t = arguments[n]))
                              Object.prototype.hasOwnProperty.call(t, a) &&
                                (e[a] = t[a]);
                          return e;
                        };
                      Object.defineProperty(n, "__esModule", { value: !0 });
                      var a = e("./payload"),
                        o = e("./base64"),
                        s = e("lodash/isEqual"),
                        i = e("lodash/has"),
                        c = e("lodash/get"),
                        u = e("lodash/isPlainObject"),
                        l = e("lodash/every"),
                        f = e("lodash/compact"),
                        d = e("lodash/map");
                      function p(e) {
                        var t = new RegExp(
                          "^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"
                        ).exec(e);
                        if (null !== t) return t.slice(1, 6);
                      }
                      function m(e) {
                        if ("*" === e[0] || "*" === e[1]) return !1;
                        if (0 < e.slice(2).length) {
                          for (
                            var t = !1, n = 0, r = e.slice(2);
                            n < r.length;
                            n++
                          ) {
                            if ("*" === r[n]) t = !0;
                            else if (t) return !1;
                          }
                          return !0;
                        }
                        return 2 == e.length;
                      }
                      function v(e) {
                        var t = e.split(".");
                        return !!(t && 1 < t.length) && m(t);
                      }
                      function h(e) {
                        var t = new RegExp(
                          "^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"
                        ).exec(e);
                        if (null !== t && v(t[1])) return t.slice(1, 6);
                      }
                      function g(e) {
                        var t = h(e);
                        if (t) {
                          var n = t[0];
                          return 5 === t.length && v(n);
                        }
                        return !1;
                      }
                      function y(e) {
                        return (
                          Array.isArray(e) &&
                          e.every(function (e) {
                            return "string" == typeof e;
                          })
                        );
                      }
                      function _(e) {
                        return y(e)
                          ? e.every(function (e) {
                              return g(e);
                            })
                          : "string" == typeof e && g(e);
                      }
                      function b(e) {
                        return (
                          !!(
                            a.isNonEmptyJson(e) &&
                            "schema" in e &&
                            "data" in e
                          ) &&
                          "string" == typeof e.schema &&
                          "object" === _typeof(e.data)
                        );
                      }
                      function w(e) {
                        return (
                          !!(a.isNonEmptyJson(e) && "e" in e) &&
                          "string" == typeof e.e
                        );
                      }
                      function k(e) {
                        var t = 0;
                        if (u(e)) {
                          if (i(e, "accept")) {
                            if (!_(e.accept)) return !1;
                            t += 1;
                          }
                          if (i(e, "reject")) {
                            if (!_(e.reject)) return !1;
                            t += 1;
                          }
                          return 0 < t && t <= 2;
                        }
                        return !1;
                      }
                      function A(e) {
                        return "function" == typeof e && e.length <= 1;
                      }
                      function x(e) {
                        return "function" == typeof e && e.length <= 1;
                      }
                      function S(e) {
                        return A(e) || b(e);
                      }
                      function C(e) {
                        return (
                          !(!Array.isArray(e) || 2 !== e.length) &&
                          (Array.isArray(e[1])
                            ? x(e[0]) && l(e[1], S)
                            : x(e[0]) && S(e[1]))
                        );
                      }
                      function j(e) {
                        return (
                          !(!Array.isArray(e) || 2 !== e.length) &&
                          !!k(e[0]) &&
                          (Array.isArray(e[1]) ? l(e[1], S) : S(e[1]))
                        );
                      }
                      function O(e) {
                        return C(e) || j(e);
                      }
                      function T(e, t) {
                        if (!g(e)) return !1;
                        var n = h(e),
                          r = p(t);
                        if (n && r) {
                          if (!P(n[0], r[0])) return !1;
                          for (var a = 1; a < 5; a++)
                            if (!I(n[a], r[a])) return !1;
                          return !0;
                        }
                        return !1;
                      }
                      function P(e, t) {
                        var n = t.split("."),
                          r = e.split(".");
                        if (n && r) {
                          if (n.length !== r.length) return !1;
                          for (var a = 0; a < r.length; a++)
                            if (!I(n[a], r[a])) return !1;
                          return !0;
                        }
                        return !1;
                      }
                      function I(e, t) {
                        return (e && t && "*" === e) || e === t;
                      }
                      function E(e, t) {
                        var n = 0,
                          r = 0,
                          a = c(e, "accept");
                        Array.isArray(a)
                          ? e.accept.some(function (e) {
                              return T(e, t);
                            }) && r++
                          : "string" == typeof a && T(a, t) && r++;
                        var o = c(e, "reject");
                        return (
                          Array.isArray(o)
                            ? e.reject.some(function (e) {
                                return T(e, t);
                              }) && n++
                            : "string" == typeof o && T(o, t) && n++,
                          0 < r && 0 === n
                        );
                      }
                      function D(e) {
                        return "string" == typeof c(e, "ue_px.data.schema")
                          ? c(e, "ue_px.data.schema")
                          : "string" == typeof c(e, "ue_pr.data.schema")
                            ? c(e, "ue_pr.data.schema")
                            : "string" == typeof c(e, "schema")
                              ? c(e, "schema")
                              : "";
                      }
                      function L(e) {
                        var t = r({}, e);
                        try {
                          i(t, "ue_px") &&
                            (t.ue_px = JSON.parse(
                              o.base64urldecode(c(t, ["ue_px"]))
                            ));
                        } catch (e) {}
                        return t;
                      }
                      function M(e) {
                        return c(e, "e", "");
                      }
                      function N(e, t, n, r) {
                        var a = void 0;
                        try {
                          return b(
                            (a = e({ event: t, eventType: n, eventSchema: r }))
                          )
                            ? a
                            : Array.isArray(a) && l(a, b)
                              ? a
                              : void 0;
                        } catch (e) {
                          a = void 0;
                        }
                        return a;
                      }
                      function F(e) {
                        return Array.isArray(e) ? e : Array.of(e);
                      }
                      function z(e, n, r, a) {
                        var t = F(e),
                          o = d(t, function (e) {
                            var t = U(e, n, r, a);
                            if (t && 0 !== t.length) return t;
                          });
                        return [].concat.apply([], f(o));
                      }
                      function U(e, t, n, r) {
                        if (b(e)) return [e];
                        if (A(e)) {
                          var a = N(e, t, n, r);
                          if (b(a)) return [a];
                          if (Array.isArray(a)) return a;
                        }
                      }
                      function B(e, t, n, r) {
                        if (C(e)) {
                          var a = e[0],
                            o = !1;
                          try {
                            o = a({ event: t, eventType: n, eventSchema: r });
                          } catch (e) {
                            o = !1;
                          }
                          if (!0 === o) return z(e[1], t, n, r);
                        } else if (j(e) && E(e[0], r)) return z(e[1], t, n, r);
                        return [];
                      }
                      function G(e, n, r, a) {
                        var t = F(e),
                          o = d(t, function (e) {
                            var t = B(e, n, r, a);
                            if (t && 0 !== t.length) return t;
                          });
                        return [].concat.apply([], f(o));
                      }
                      (n.getSchemaParts = p),
                        (n.validateVendorParts = m),
                        (n.validateVendor = v),
                        (n.getRuleParts = h),
                        (n.isValidRule = g),
                        (n.isStringArray = y),
                        (n.isValidRuleSetArg = _),
                        (n.isSelfDescribingJson = b),
                        (n.isEventJson = w),
                        (n.isRuleSet = k),
                        (n.isContextGenerator = A),
                        (n.isContextFilter = x),
                        (n.isContextPrimitive = S),
                        (n.isFilterProvider = C),
                        (n.isRuleSetProvider = j),
                        (n.isConditionalContextProvider = O),
                        (n.matchSchemaAgainstRule = T),
                        (n.matchVendor = P),
                        (n.matchPart = I),
                        (n.matchSchemaAgainstRuleSet = E),
                        (n.getUsefulSchema = D),
                        (n.getDecodedEvent = L),
                        (n.getEventType = M),
                        (n.buildGenerator = N),
                        (n.normalizeToArray = F),
                        (n.generatePrimitives = z),
                        (n.evaluatePrimitive = U),
                        (n.evaluateProvider = B),
                        (n.generateConditionals = G),
                        (n.contextModule = function () {
                          var i = [],
                            c = [];
                          return {
                            getGlobalPrimitives: function () {
                              return i;
                            },
                            getConditionalProviders: function () {
                              return c;
                            },
                            addGlobalContexts: function (e) {
                              for (
                                var t = [], n = [], r = 0, a = e;
                                r < a.length;
                                r++
                              ) {
                                var o = a[r];
                                O(o) ? t.push(o) : S(o) && n.push(o);
                              }
                              (i = i.concat(n)), (c = c.concat(t));
                            },
                            clearGlobalContexts: function () {
                              (c = []), (i = []);
                            },
                            removeGlobalContexts: function (e) {
                              for (
                                var t = function (t) {
                                    O(t)
                                      ? (c = c.filter(function (e) {
                                          return !s(e, t);
                                        }))
                                      : S(t) &&
                                        (i = i.filter(function (e) {
                                          return !s(e, t);
                                        }));
                                  },
                                  n = 0,
                                  r = e;
                                n < r.length;
                                n++
                              ) {
                                t(r[n]);
                              }
                            },
                            getApplicableContexts: function (e) {
                              var t = e.build();
                              return w(t)
                                ? (function (e) {
                                    var t = D(e),
                                      n = M(e),
                                      r = [],
                                      a = z(i, e, n, t);
                                    r.push.apply(r, a);
                                    var o = G(c, e, n, t);
                                    return r.push.apply(r, o), r;
                                  })(L(t))
                                : [];
                            },
                          };
                        });
                    },
                    {
                      "./base64": 154,
                      "./payload": 157,
                      "lodash/compact": 116,
                      "lodash/every": 118,
                      "lodash/get": 123,
                      "lodash/has": 124,
                      "lodash/isEqual": 131,
                      "lodash/isPlainObject": 136,
                      "lodash/map": 142,
                    },
                  ],
                  156: [
                    function (e, t, n) {
                      Object.defineProperty(n, "__esModule", { value: !0 });
                      var s = e("uuid"),
                        v = e("./payload"),
                        r = e("./contexts");
                      n.trackerCore = function (d, o) {
                        void 0 === d && (d = !0);
                        var i = {},
                          a = r.contextModule();
                        function n(e, t) {
                          i[e] = t;
                        }
                        function f(e, t) {
                          var n = {};
                          for (var r in ((t = t || {}), e))
                            (t[r] || (null !== e[r] && void 0 !== e[r])) &&
                              (n[r] = e[r]);
                          return n;
                        }
                        function c(e, t) {
                          var n = (function (e) {
                              return a.getApplicableContexts(e);
                            })(e),
                            r = [];
                          return (
                            t && t.length && r.push.apply(r, t),
                            n && n.length && r.push.apply(r, n),
                            r
                          );
                        }
                        function p(e, t, n) {
                          e.addDict(i), e.add("eid", s.v4());
                          var r = (function (e) {
                            return null == e
                              ? { type: "dtm", value: new Date().getTime() }
                              : "number" == typeof e
                                ? { type: "dtm", value: e }
                                : "ttm" === e.type
                                  ? { type: "ttm", value: e.value }
                                  : {
                                      type: "dtm",
                                      value: e.value || new Date().getTime(),
                                    };
                          })(n);
                          e.add(r.type, r.value.toString());
                          var a = (function (e) {
                            if (e && e.length)
                              return {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                                data: e,
                              };
                          })(c(e, t));
                          return (
                            void 0 !== a && e.addJson("cx", "co", a),
                            "function" == typeof o && o(e),
                            e
                          );
                        }
                        function m(e, t, n) {
                          var r = v.payloadBuilder(d),
                            a = {
                              schema:
                                "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
                              data: e,
                            };
                          return (
                            r.add("e", "ue"),
                            r.addJson("ue_px", "ue_pr", a),
                            p(r, t, n)
                          );
                        }
                        return {
                          setBase64Encoding: function (e) {
                            d = e;
                          },
                          addPayloadPair: n,
                          addPayloadDict: function (e) {
                            for (var t in e)
                              e.hasOwnProperty(t) && (i[t] = e[t]);
                          },
                          resetPayloadPairs: function (e) {
                            i = v.isJson(e) ? e : {};
                          },
                          setTrackerVersion: function (e) {
                            n("tv", e);
                          },
                          setTrackerNamespace: function (e) {
                            n("tna", e);
                          },
                          setAppId: function (e) {
                            n("aid", e);
                          },
                          setPlatform: function (e) {
                            n("p", e);
                          },
                          setUserId: function (e) {
                            n("uid", e);
                          },
                          setScreenResolution: function (e, t) {
                            n("res", e + "x" + t);
                          },
                          setViewport: function (e, t) {
                            n("vp", e + "x" + t);
                          },
                          setColorDepth: function (e) {
                            n("cd", e);
                          },
                          setTimezone: function (e) {
                            n("tz", e);
                          },
                          setLang: function (e) {
                            n("lang", e);
                          },
                          setIpAddress: function (e) {
                            n("ip", e);
                          },
                          setUseragent: function (e) {
                            n("ua", e);
                          },
                          trackUnstructEvent: m,
                          trackSelfDescribingEvent: m,
                          trackPageView: function (e, t, n, r, a) {
                            var o = v.payloadBuilder(d);
                            return (
                              o.add("e", "pv"),
                              o.add("url", e),
                              o.add("page", t),
                              o.add("refr", n),
                              p(o, r, a)
                            );
                          },
                          trackPagePing: function (e, t, n, r, a, o, i, c, s) {
                            var u = v.payloadBuilder(d);
                            return (
                              u.add("e", "pp"),
                              u.add("url", e),
                              u.add("page", t),
                              u.add("refr", n),
                              u.add("pp_mix", r.toString()),
                              u.add("pp_max", a.toString()),
                              u.add("pp_miy", o.toString()),
                              u.add("pp_may", i.toString()),
                              p(u, c, s)
                            );
                          },
                          trackStructEvent: function (e, t, n, r, a, o, i) {
                            var c = v.payloadBuilder(d);
                            return (
                              c.add("e", "se"),
                              c.add("se_ca", e),
                              c.add("se_ac", t),
                              c.add("se_la", n),
                              c.add("se_pr", r),
                              c.add("se_va", null == a ? void 0 : a.toString()),
                              p(c, o, i)
                            );
                          },
                          trackEcommerceTransaction: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c,
                            s,
                            u,
                            l
                          ) {
                            var f = v.payloadBuilder(d);
                            return (
                              f.add("e", "tr"),
                              f.add("tr_id", e),
                              f.add("tr_af", t),
                              f.add("tr_tt", n),
                              f.add("tr_tx", r),
                              f.add("tr_sh", a),
                              f.add("tr_ci", o),
                              f.add("tr_st", i),
                              f.add("tr_co", c),
                              f.add("tr_cu", s),
                              p(f, u, l)
                            );
                          },
                          trackEcommerceTransactionItem: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c,
                            s
                          ) {
                            var u = v.payloadBuilder(d);
                            return (
                              u.add("e", "ti"),
                              u.add("ti_id", e),
                              u.add("ti_sk", t),
                              u.add("ti_nm", n),
                              u.add("ti_ca", r),
                              u.add("ti_pr", a),
                              u.add("ti_qu", o),
                              u.add("ti_cu", i),
                              p(u, c, s)
                            );
                          },
                          trackScreenView: function (e, t, n, r) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/screen_view/jsonschema/1-0-0",
                                data: f({ name: e, id: t }),
                              },
                              n,
                              r
                            );
                          },
                          trackLinkClick: function (e, t, n, r, a, o, i) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
                                data: f({
                                  targetUrl: e,
                                  elementId: t,
                                  elementClasses: n,
                                  elementTarget: r,
                                  elementContent: a,
                                }),
                              },
                              o,
                              i
                            );
                          },
                          trackAdImpression: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c,
                            s,
                            u
                          ) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0",
                                data: f({
                                  impressionId: e,
                                  costModel: t,
                                  cost: n,
                                  targetUrl: r,
                                  bannerId: a,
                                  zoneId: o,
                                  advertiserId: i,
                                  campaignId: c,
                                }),
                              },
                              s,
                              u
                            );
                          },
                          trackAdClick: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c,
                            s,
                            u,
                            l
                          ) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/ad_click/jsonschema/1-0-0",
                                data: f({
                                  targetUrl: e,
                                  clickId: t,
                                  costModel: n,
                                  cost: r,
                                  bannerId: a,
                                  zoneId: o,
                                  impressionId: i,
                                  advertiserId: c,
                                  campaignId: s,
                                }),
                              },
                              u,
                              l
                            );
                          },
                          trackAdConversion: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c,
                            s,
                            u,
                            l
                          ) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/ad_conversion/jsonschema/1-0-0",
                                data: f({
                                  conversionId: e,
                                  costModel: t,
                                  cost: n,
                                  category: r,
                                  action: a,
                                  property: o,
                                  initialValue: i,
                                  advertiserId: c,
                                  campaignId: s,
                                }),
                              },
                              u,
                              l
                            );
                          },
                          trackSocialInteraction: function (e, t, n, r, a) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/social_interaction/jsonschema/1-0-0",
                                data: f({ action: e, network: t, target: n }),
                              },
                              r,
                              a
                            );
                          },
                          trackAddToCart: function (e, t, n, r, a, o, i, c) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/add_to_cart/jsonschema/1-0-0",
                                data: f({
                                  sku: e,
                                  name: t,
                                  category: n,
                                  unitPrice: r,
                                  quantity: a,
                                  currency: o,
                                }),
                              },
                              i,
                              c
                            );
                          },
                          trackRemoveFromCart: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c
                          ) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/remove_from_cart/jsonschema/1-0-0",
                                data: f({
                                  sku: e,
                                  name: t,
                                  category: n,
                                  unitPrice: r,
                                  quantity: a,
                                  currency: o,
                                }),
                              },
                              i,
                              c
                            );
                          },
                          trackFormFocusOrChange: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i,
                            c,
                            s
                          ) {
                            var u = "",
                              l = {
                                formId: t,
                                elementId: n,
                                nodeName: r,
                                elementClasses: o,
                                value: i,
                              };
                            return (
                              "change_form" === e
                                ? ((u =
                                    "iglu:com.snowplowanalytics.snowplow/change_form/jsonschema/1-0-0"),
                                  (l.type = a))
                                : "focus_form" === e &&
                                  ((u =
                                    "iglu:com.snowplowanalytics.snowplow/focus_form/jsonschema/1-0-0"),
                                  (l.elementType = a)),
                              m({ schema: u, data: f(l, { value: !0 }) }, c, s)
                            );
                          },
                          trackFormSubmission: function (e, t, n, r, a) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/submit_form/jsonschema/1-0-0",
                                data: f({
                                  formId: e,
                                  formClasses: t,
                                  elements: n,
                                }),
                              },
                              r,
                              a
                            );
                          },
                          trackSiteSearch: function (e, t, n, r, a, o) {
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/site_search/jsonschema/1-0-0",
                                data: f({
                                  terms: e,
                                  filters: t,
                                  totalResults: n,
                                  pageResults: r,
                                }),
                              },
                              a,
                              o
                            );
                          },
                          trackConsentWithdrawn: function (
                            e,
                            t,
                            n,
                            r,
                            a,
                            o,
                            i
                          ) {
                            var c = {
                              schema:
                                "iglu:com.snowplowanalytics.snowplow/consent_document/jsonschema/1-0-0",
                              data: f({
                                id: t,
                                version: n,
                                name: r,
                                description: a,
                              }),
                            };
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/consent_withdrawn/jsonschema/1-0-0",
                                data: f({ all: e }),
                              },
                              c.data && o ? o.concat([c]) : o,
                              i
                            );
                          },
                          trackConsentGranted: function (e, t, n, r, a, o, i) {
                            var c = {
                              schema:
                                "iglu:com.snowplowanalytics.snowplow/consent_document/jsonschema/1-0-0",
                              data: f({
                                id: e,
                                version: t,
                                name: n,
                                description: r,
                              }),
                            };
                            return m(
                              {
                                schema:
                                  "iglu:com.snowplowanalytics.snowplow/consent_granted/jsonschema/1-0-0",
                                data: f({ expiry: a }),
                              },
                              o ? o.concat([c]) : [c],
                              i
                            );
                          },
                          addGlobalContexts: function (e) {
                            a.addGlobalContexts(e);
                          },
                          clearGlobalContexts: function () {
                            a.clearGlobalContexts();
                          },
                          removeGlobalContexts: function (e) {
                            a.removeGlobalContexts(e);
                          },
                        };
                      };
                    },
                    { "./contexts": 155, "./payload": 157, uuid: 159 },
                  ],
                  157: [
                    function (e, t, n) {
                      Object.defineProperty(n, "__esModule", { value: !0 });
                      var i = e("./base64");
                      function c(e) {
                        if (!r(e)) return !1;
                        for (var t in e) if (e.hasOwnProperty(t)) return !0;
                        return !1;
                      }
                      function r(e) {
                        return (
                          null != e &&
                          (e.constructor === {}.constructor ||
                            e.constructor === [].constructor)
                        );
                      }
                      (n.isNonEmptyJson = c),
                        (n.isJson = r),
                        (n.payloadBuilder = function (a) {
                          function o(e, t) {
                            null != t && "" !== t && (n[e] = t);
                          }
                          var n = {};
                          return {
                            add: o,
                            addDict: function (e) {
                              for (var t in e)
                                e.hasOwnProperty(t) && o(t, e[t]);
                            },
                            addJson: function (e, t, n) {
                              if (c(n)) {
                                var r = JSON.stringify(n);
                                a
                                  ? o(
                                      e,
                                      (function (e) {
                                        return e
                                          ? i
                                              .base64encode(e)
                                              .replace(/=/g, "")
                                              .replace(/\+/g, "-")
                                              .replace(/\//g, "_")
                                          : e;
                                      })(r)
                                    )
                                  : o(t, r);
                              }
                            },
                            build: function () {
                              return n;
                            },
                          };
                        });
                    },
                    { "./base64": 154 },
                  ],
                  158: [
                    function (e, o, t) {
                      (function (e) {
                        var t,
                          n = e.crypto || e.msCrypto;
                        if (n && n.getRandomValues) {
                          var r = new Uint8Array(16);
                          t = function () {
                            return n.getRandomValues(r), r;
                          };
                        }
                        if (!t) {
                          var a = new Array(16);
                          t = function () {
                            for (var e, t = 0; t < 16; t++)
                              0 == (3 & t) && (e = 4294967296 * Math.random()),
                                (a[t] = (e >>> ((3 & t) << 3)) & 255);
                            return a;
                          };
                        }
                        o.exports = t;
                      }).call(
                        this,
                        "undefined" != typeof global
                          ? global
                          : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                              ? window
                              : {}
                      );
                    },
                    {},
                  ],
                  159: [
                    function (e, t, n) {
                      for (
                        var i = e("./rng"), a = [], o = {}, r = 0;
                        r < 256;
                        r++
                      )
                        (a[r] = (r + 256).toString(16).substr(1)),
                          (o[a[r]] = r);
                      function p(e, t) {
                        var n = t || 0,
                          r = a;
                        return (
                          r[e[n++]] +
                          r[e[n++]] +
                          r[e[n++]] +
                          r[e[n++]] +
                          "-" +
                          r[e[n++]] +
                          r[e[n++]] +
                          "-" +
                          r[e[n++]] +
                          r[e[n++]] +
                          "-" +
                          r[e[n++]] +
                          r[e[n++]] +
                          "-" +
                          r[e[n++]] +
                          r[e[n++]] +
                          r[e[n++]] +
                          r[e[n++]] +
                          r[e[n++]] +
                          r[e[n++]]
                        );
                      }
                      var c = i(),
                        m = [1 | c[0], c[1], c[2], c[3], c[4], c[5]],
                        v = 16383 & ((c[6] << 8) | c[7]),
                        h = 0,
                        g = 0;
                      function s(e, t, n) {
                        var r = (t && n) || 0;
                        "string" == typeof e &&
                          ((t = "binary" == e ? new Array(16) : null),
                          (e = null));
                        var a = (e = e || {}).random || (e.rng || i)();
                        if (
                          ((a[6] = (15 & a[6]) | 64),
                          (a[8] = (63 & a[8]) | 128),
                          t)
                        )
                          for (var o = 0; o < 16; o++) t[r + o] = a[o];
                        return t || p(a);
                      }
                      var u = s;
                      (u.v1 = function (e, t, n) {
                        var r = (t && n) || 0,
                          a = t || [],
                          o =
                            void 0 !== (e = e || {}).clockseq ? e.clockseq : v,
                          i =
                            void 0 !== e.msecs ? e.msecs : new Date().getTime(),
                          c = void 0 !== e.nsecs ? e.nsecs : g + 1,
                          s = i - h + (c - g) / 1e4;
                        if (
                          (s < 0 &&
                            void 0 === e.clockseq &&
                            (o = (o + 1) & 16383),
                          (s < 0 || h < i) && void 0 === e.nsecs && (c = 0),
                          1e4 <= c)
                        )
                          throw new Error(
                            "uuid.v1(): Can't create more than 10M uuids/sec"
                          );
                        (h = i), (v = o);
                        var u =
                          (1e4 * (268435455 & (i += 122192928e5)) + (g = c)) %
                          4294967296;
                        (a[r++] = (u >>> 24) & 255),
                          (a[r++] = (u >>> 16) & 255),
                          (a[r++] = (u >>> 8) & 255),
                          (a[r++] = 255 & u);
                        var l = ((i / 4294967296) * 1e4) & 268435455;
                        (a[r++] = (l >>> 8) & 255),
                          (a[r++] = 255 & l),
                          (a[r++] = ((l >>> 24) & 15) | 16),
                          (a[r++] = (l >>> 16) & 255),
                          (a[r++] = (o >>> 8) | 128),
                          (a[r++] = 255 & o);
                        for (var f = e.node || m, d = 0; d < 6; d++)
                          a[r + d] = f[d];
                        return t || p(a);
                      }),
                        (u.v4 = s),
                        (u.parse = function (e, t, n) {
                          var r = (t && n) || 0,
                            a = 0;
                          for (
                            t = t || [],
                              e
                                .toLowerCase()
                                .replace(/[0-9a-f]{2}/g, function (e) {
                                  a < 16 && (t[r + a++] = o[e]);
                                });
                            a < 16;

                          )
                            t[r + a++] = 0;
                          return t;
                        }),
                        (u.unparse = p),
                        (t.exports = u);
                    },
                    { "./rng": 158 },
                  ],
                  160: [
                    function (e, t, n) {
                      var r = e("./v1"),
                        a = e("./v4"),
                        o = a;
                      (o.v1 = r), (o.v4 = a), (t.exports = o);
                    },
                    { "./v1": 163, "./v4": 164 },
                  ],
                  161: [
                    function (e, t, n) {
                      for (var a = [], r = 0; r < 256; ++r)
                        a[r] = (r + 256).toString(16).substr(1);
                      t.exports = function (e, t) {
                        var n = t || 0,
                          r = a;
                        return [
                          r[e[n++]],
                          r[e[n++]],
                          r[e[n++]],
                          r[e[n++]],
                          "-",
                          r[e[n++]],
                          r[e[n++]],
                          "-",
                          r[e[n++]],
                          r[e[n++]],
                          "-",
                          r[e[n++]],
                          r[e[n++]],
                          "-",
                          r[e[n++]],
                          r[e[n++]],
                          r[e[n++]],
                          r[e[n++]],
                          r[e[n++]],
                          r[e[n++]],
                        ].join("");
                      };
                    },
                    {},
                  ],
                  162: [
                    function (e, t, n) {
                      var r =
                        ("undefined" != typeof crypto &&
                          crypto.getRandomValues &&
                          crypto.getRandomValues.bind(crypto)) ||
                        ("undefined" != typeof msCrypto &&
                          "function" ==
                            typeof window.msCrypto.getRandomValues &&
                          msCrypto.getRandomValues.bind(msCrypto));
                      if (r) {
                        var a = new Uint8Array(16);
                        t.exports = function () {
                          return r(a), a;
                        };
                      } else {
                        var o = new Array(16);
                        t.exports = function () {
                          for (var e, t = 0; t < 16; t++)
                            0 == (3 & t) && (e = 4294967296 * Math.random()),
                              (o[t] = (e >>> ((3 & t) << 3)) & 255);
                          return o;
                        };
                      }
                    },
                    {},
                  ],
                  163: [
                    function (e, t, n) {
                      var m,
                        v,
                        h = e("./lib/rng"),
                        g = e("./lib/bytesToUuid"),
                        y = 0,
                        _ = 0;
                      t.exports = function (e, t, n) {
                        var r = (t && n) || 0,
                          a = t || [],
                          o = (e = e || {}).node || m,
                          i = void 0 !== e.clockseq ? e.clockseq : v;
                        if (null == o || null == i) {
                          var c = h();
                          null == o &&
                            (o = m = [1 | c[0], c[1], c[2], c[3], c[4], c[5]]),
                            null == i && (i = v = 16383 & ((c[6] << 8) | c[7]));
                        }
                        var s =
                            void 0 !== e.msecs ? e.msecs : new Date().getTime(),
                          u = void 0 !== e.nsecs ? e.nsecs : _ + 1,
                          l = s - y + (u - _) / 1e4;
                        if (
                          (l < 0 &&
                            void 0 === e.clockseq &&
                            (i = (i + 1) & 16383),
                          (l < 0 || y < s) && void 0 === e.nsecs && (u = 0),
                          1e4 <= u)
                        )
                          throw new Error(
                            "uuid.v1(): Can't create more than 10M uuids/sec"
                          );
                        (y = s), (v = i);
                        var f =
                          (1e4 * (268435455 & (s += 122192928e5)) + (_ = u)) %
                          4294967296;
                        (a[r++] = (f >>> 24) & 255),
                          (a[r++] = (f >>> 16) & 255),
                          (a[r++] = (f >>> 8) & 255),
                          (a[r++] = 255 & f);
                        var d = ((s / 4294967296) * 1e4) & 268435455;
                        (a[r++] = (d >>> 8) & 255),
                          (a[r++] = 255 & d),
                          (a[r++] = ((d >>> 24) & 15) | 16),
                          (a[r++] = (d >>> 16) & 255),
                          (a[r++] = (i >>> 8) | 128),
                          (a[r++] = 255 & i);
                        for (var p = 0; p < 6; ++p) a[r + p] = o[p];
                        return t || g(a);
                      };
                    },
                    { "./lib/bytesToUuid": 161, "./lib/rng": 162 },
                  ],
                  164: [
                    function (e, t, n) {
                      var i = e("./lib/rng"),
                        c = e("./lib/bytesToUuid");
                      t.exports = function (e, t, n) {
                        var r = (t && n) || 0;
                        "string" == typeof e &&
                          ((t = "binary" === e ? new Array(16) : null),
                          (e = null));
                        var a = (e = e || {}).random || (e.rng || i)();
                        if (
                          ((a[6] = (15 & a[6]) | 64),
                          (a[8] = (63 & a[8]) | 128),
                          t)
                        )
                          for (var o = 0; o < 16; ++o) t[r + o] = a[o];
                        return t || c(a);
                      };
                    },
                    { "./lib/bytesToUuid": 161, "./lib/rng": 162 },
                  ],
                  165: [
                    function (e, t, n) {
                      var o = e("lodash/isFunction"),
                        i = e("./lib/helpers"),
                        s = window;
                      (void 0 !== n ? n : this).errorManager = function (c) {
                        function a(e, t, n, r, a, o) {
                          var i = a && a.stack ? a.stack : null;
                          c.trackSelfDescribingEvent(
                            {
                              schema:
                                "iglu:com.snowplowanalytics.snowplow/application_error/jsonschema/1-0-1",
                              data: {
                                programmingLanguage: "JAVASCRIPT",
                                message:
                                  e ||
                                  "JS Exception. Browser doesn't support ErrorEvent API",
                                stackTrace: i,
                                lineNumber: n,
                                lineColumn: r,
                                fileName: t,
                              },
                            },
                            o
                          );
                        }
                        return {
                          trackError: a,
                          enableErrorTracking: function (t, n, r) {
                            i.addEventListener(
                              s,
                              "error",
                              function (e) {
                                ((o(t) && t(e)) || null == t) &&
                                  (function (e, t, n) {
                                    var r;
                                    (r = o(n) ? t.concat(n(e)) : t),
                                      a(
                                        e.message,
                                        e.filename,
                                        e.lineno,
                                        e.colno,
                                        e.error,
                                        r
                                      );
                                  })(e, r, n);
                              },
                              !0
                            );
                          },
                        };
                      };
                    },
                    { "./lib/helpers": 171, "lodash/isFunction": 132 },
                  ],
                  166: [
                    function (e, t, n) {
                      var p = e("lodash/forEach"),
                        m = e("lodash/filter"),
                        v = e("lodash/find"),
                        h = e("./lib/helpers");
                      (void 0 !== n ? n : this).getFormTrackingManager =
                        function (i, e, c) {
                          var a = ["textarea", "input", "select"],
                            o = e + "form",
                            r = function () {
                              return !0;
                            },
                            s = function () {
                              return !0;
                            },
                            u = function (e) {
                              return e;
                            };
                          function l(t) {
                            return t[
                              v(
                                ["name", "id", "type", "nodeName"],
                                function (e) {
                                  return t[e] && "string" == typeof t[e];
                                }
                              )
                            ];
                          }
                          function f(a, o) {
                            return function (e) {
                              var t = e.target,
                                n =
                                  t.nodeName &&
                                  "INPUT" === t.nodeName.toUpperCase()
                                    ? t.type
                                    : null,
                                r =
                                  "checkbox" !== t.type || t.checked
                                    ? u(t.value)
                                    : null;
                              ("change_form" === a ||
                                ("checkbox" !== n && "radio" !== n)) &&
                                i.trackFormFocusOrChange(
                                  a,
                                  (function (e) {
                                    for (
                                      ;
                                      e &&
                                      e.nodeName &&
                                      "HTML" !== e.nodeName.toUpperCase() &&
                                      "FORM" !== e.nodeName.toUpperCase();

                                    )
                                      e = e.parentNode;
                                    if (
                                      e &&
                                      e.nodeName &&
                                      "FORM" === e.nodeName.toUpperCase()
                                    )
                                      return l(e);
                                  })(t),
                                  l(t),
                                  t.nodeName,
                                  n,
                                  h.getCssClasses(t),
                                  r,
                                  c(h.resolveDynamicContexts(o, t, n, r))
                                );
                            };
                          }
                          function d(r) {
                            return function (e) {
                              var t = e.target,
                                n = (function (n) {
                                  var r = [];
                                  return (
                                    p(a, function (e) {
                                      var t = m(
                                        n.getElementsByTagName(e),
                                        function (e) {
                                          return e.hasOwnProperty(o);
                                        }
                                      );
                                      p(t, function (e) {
                                        if ("submit" !== e.type) {
                                          var t = {
                                            name: l(e),
                                            value: e.value,
                                            nodeName: e.nodeName,
                                          };
                                          e.type &&
                                            "INPUT" ===
                                              e.nodeName.toUpperCase() &&
                                            (t.type = e.type),
                                            ("checkbox" !== e.type &&
                                              "radio" !== e.type) ||
                                              e.checked ||
                                              (t.value = null),
                                            r.push(t);
                                        }
                                      });
                                    }),
                                    r
                                  );
                                })(t);
                              p(n, function (e) {
                                e.value = u(e.value);
                              }),
                                i.trackFormSubmission(
                                  l(t),
                                  h.getCssClasses(t),
                                  n,
                                  c(h.resolveDynamicContexts(r, t, n))
                                );
                            };
                          }
                          return {
                            configureFormTracking: function (e) {
                              e &&
                                ((r = h.getFilter(e.forms, !0)),
                                (s = h.getFilter(e.fields, !1)),
                                (u = h.getTransform(e.fields)));
                            },
                            addFormListeners: function (n) {
                              p(
                                document.getElementsByTagName("form"),
                                function (t) {
                                  r(t) &&
                                    !t[o] &&
                                    (p(a, function (e) {
                                      p(
                                        t.getElementsByTagName(e),
                                        function (e) {
                                          s(e) &&
                                            !e[o] &&
                                            "password" !==
                                              e.type.toLowerCase() &&
                                            (h.addEventListener(
                                              e,
                                              "focus",
                                              f("focus_form", n),
                                              !1
                                            ),
                                            h.addEventListener(
                                              e,
                                              "change",
                                              f("change_form", n),
                                              !1
                                            ),
                                            (e[o] = !0));
                                        }
                                      );
                                    }),
                                    h.addEventListener(t, "submit", d(n)),
                                    (t[o] = !0));
                                }
                              );
                            },
                          };
                        };
                    },
                    {
                      "./lib/helpers": 171,
                      "lodash/filter": 119,
                      "lodash/find": 120,
                      "lodash/forEach": 122,
                    },
                  ],
                  167: [
                    function (e, t, n) {
                      n.productionize = function (r) {
                        var a = {};
                        return (
                          "object" === _typeof(r) &&
                            null !== r &&
                            Object.getOwnPropertyNames(r).forEach(
                              function (e, t, n) {
                                "function" == typeof r[e] &&
                                  (a[e] = (function (e) {
                                    return function () {
                                      try {
                                        return e.apply(this, arguments);
                                      } catch (e) {}
                                    };
                                  })(r[e]));
                              }
                            ),
                          a
                        );
                      };
                    },
                    {},
                  ],
                  168: [
                    function (e, t, n) {
                      !(function () {
                        var c = e("lodash/map"),
                          h = e("lodash/isUndefined"),
                          g = e("lodash/isFunction"),
                          y = e("./lib/helpers");
                        (void 0 !== n ? n : this).InQueueManager = function (
                          r,
                          a,
                          o,
                          e,
                          i
                        ) {
                          var p = {};
                          function m(e) {
                            var t = [];
                            if (e && 0 !== e.length)
                              for (var n = 0; n < e.length; n++)
                                p.hasOwnProperty(e[n])
                                  ? t.push(p[e[n]])
                                  : y.warn(
                                      'Warning: Tracker namespace "' +
                                        e[n] +
                                        '" not configured'
                                    );
                            else t = c(p);
                            return (
                              0 === t.length &&
                                y.warn("Warning: No tracker configured"),
                              t
                            );
                          }
                          function v(e, t, n) {
                            (n = n || {}),
                              p.hasOwnProperty(e)
                                ? y.warn(
                                    "Tracker namespace " +
                                      e +
                                      " already exists."
                                  )
                                : ((p[e] = new r(i, e, a, o, n)),
                                  p[e].setCollectorUrl(t));
                          }
                          function t() {
                            var e, t, n, r, a, o, i, c, s, u, l, f, d;
                            for (e = 0; e < arguments.length; e += 1) {
                              if (
                                ((r = arguments[e]),
                                (a = Array.prototype.shift.call(r)),
                                g(a))
                              )
                                try {
                                  a.apply(p, r);
                                } catch (e) {
                                  y.warn("Custom callback error - ".concat(e));
                                } finally {
                                  continue;
                                }
                              if (
                                ((d = void 0),
                                (i = (o = [
                                  (d = a.split(":"))[0],
                                  1 < d.length ? d[1].split(";") : [],
                                ])[1]),
                                "newTracker" !== (n = o[0]))
                              )
                                if (
                                  ("setCollectorCf" !== n &&
                                    "setCollectorUrl" !== n) ||
                                  (i && 0 !== i.length)
                                )
                                  for (c = m(i), t = 0; t < c.length; t++)
                                    c[t][n].apply(c[t], r);
                                else
                                  (s = n),
                                    (u = r[0]),
                                    (l = r[1]),
                                    (f = void 0),
                                    y.warn(
                                      s +
                                        " is deprecated. Set the collector when a new tracker instance using newTracker."
                                    ),
                                    v((f = h(l) ? "sp" : l)),
                                    p[f][s](u);
                              else v(r[0], r[1], r[2]);
                            }
                          }
                          for (var n = 0; n < e.length; n++) t(e[n]);
                          return { push: t };
                        };
                      })();
                    },
                    {
                      "./lib/helpers": 171,
                      "lodash/isFunction": 132,
                      "lodash/isUndefined": 140,
                      "lodash/map": 142,
                    },
                  ],
                  169: [
                    function (e, t, n) {
                      var r,
                        a,
                        o = e("./snowplow"),
                        i = window;
                      i.GlobalAndataTrackingNamespace &&
                      0 < i.GlobalAndataTrackingNamespace.length
                        ? ((r = i.GlobalAndataTrackingNamespace.shift()),
                          ((a = i[r]).q = new o.Snowplow(a.q, r)))
                        : ((i._snaq = i._snaq || []),
                          (i._snaq = new o.Snowplow(i._snaq, "_snaq")));
                    },
                    { "./snowplow": 175 },
                  ],
                  170: [
                    function (t, e, r) {
                      !(function () {
                        var i = t("lodash/isFunction"),
                          c = t("lodash/isUndefined"),
                          e = t("jstimezonedetect").jstz.determine(),
                          n = t("./helpers"),
                          s = void 0 !== r ? r : this,
                          u = window,
                          l = navigator,
                          f = screen,
                          o = document;
                        (s.hasSessionStorage = function () {
                          try {
                            return !!u.sessionStorage;
                          } catch (e) {
                            return !0;
                          }
                        }),
                          (s.hasLocalStorage = function () {
                            try {
                              return !!u.localStorage;
                            } catch (e) {
                              return !0;
                            }
                          }),
                          (s.localStorageAccessible = function () {
                            var e = "modernizr";
                            if (!s.hasLocalStorage()) return !1;
                            try {
                              return (
                                u.localStorage.setItem(e, e),
                                u.localStorage.removeItem(e),
                                !0
                              );
                            } catch (e) {
                              return !1;
                            }
                          }),
                          (s.hasCookies = function (e) {
                            var t = e || "testcookie";
                            return c(l.cookieEnabled)
                              ? (n.cookie(t, "1"),
                                "1" === n.cookie(t) ? "1" : "0")
                              : l.cookieEnabled
                                ? "1"
                                : "0";
                          }),
                          (s.detectTimezone = function () {
                            return void 0 === e ? "" : e.name();
                          }),
                          (s.detectViewport = function () {
                            var e = u,
                              t = "inner";
                            "innerWidth" in u ||
                              ((t = "client"),
                              (e = o.documentElement || o.body));
                            var n = e[t + "Width"],
                              r = e[t + "Height"];
                            return 0 <= n && 0 <= r ? n + "x" + r : null;
                          }),
                          (s.detectDocumentSize = function () {
                            var e = o.documentElement,
                              t = o.body,
                              n = t
                                ? Math.max(t.offsetHeight, t.scrollHeight)
                                : 0,
                              r = Math.max(
                                e.clientWidth,
                                e.offsetWidth,
                                e.scrollWidth
                              ),
                              a = Math.max(
                                e.clientHeight,
                                e.offsetHeight,
                                e.scrollHeight,
                                n
                              );
                            return isNaN(r) || isNaN(a) ? "" : r + "x" + a;
                          }),
                          (s.detectBrowserFeatures = function (e, t) {
                            var n,
                              r,
                              a = {
                                pdf: "application/pdf",
                                qt: "video/quicktime",
                                realp: "audio/x-pn-realaudio-plugin",
                                wma: "application/x-mplayer2",
                                dir: "application/x-director",
                                fla: "application/x-shockwave-flash",
                                java: "application/x-java-vm",
                                gears: "application/x-googlegears",
                                ag: "application/x-silverlight",
                              },
                              o = {};
                            if (l.mimeTypes && l.mimeTypes.length)
                              for (n in a)
                                Object.prototype.hasOwnProperty.call(a, n) &&
                                  ((r = l.mimeTypes[a[n]]),
                                  (o[n] = r && r.enabledPlugin ? "1" : "0"));
                            return (
                              l.constructor === window.Navigator &&
                                "unknown" != typeof l.javaEnabled &&
                                !c(l.javaEnabled) &&
                                l.javaEnabled() &&
                                (o.java = "1"),
                              i(u.GearsFactory) && (o.gears = "1"),
                              (o.res = f.width + "x" + f.height),
                              (o.cd = f.colorDepth),
                              e && (o.cookie = s.hasCookies(t)),
                              o
                            );
                          });
                      })();
                    },
                    {
                      "./helpers": 171,
                      jstimezonedetect: 3,
                      "lodash/isFunction": 132,
                      "lodash/isUndefined": 140,
                    },
                  ],
                  171: [
                    function (e, t, c) {
                      !(function () {
                        var n = e("lodash/filter"),
                          r = e("lodash/isString"),
                          a = e("lodash/isUndefined"),
                          i = e("lodash/isObject"),
                          o = e("lodash/map"),
                          s = void 0 !== c ? c : this;
                        (s.fixupTitle = function (e) {
                          if (!r(e)) {
                            e = e.text || "";
                            var t = document.getElementsByTagName("title");
                            t && !a(t[0]) && (e = t[0].text);
                          }
                          return e;
                        }),
                          (s.getHostName = function (e) {
                            var t = new RegExp(
                              "^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"
                            ).exec(e);
                            return t ? t[1] : e;
                          }),
                          (s.fixupDomain = function (e) {
                            var t = e.length;
                            return (
                              "." === e.charAt(--t) && (e = e.slice(0, t)),
                              "*." === e.slice(0, 2) && (e = e.slice(1)),
                              e
                            );
                          }),
                          (s.getReferrer = function (e) {
                            var t = "",
                              n =
                                s.fromQuerystring(
                                  "referrer",
                                  window.location.href
                                ) ||
                                s.fromQuerystring(
                                  "referer",
                                  window.location.href
                                );
                            if (n) return n;
                            if (e) return e;
                            try {
                              t = window.top.document.referrer;
                            } catch (e) {
                              if (window.parent)
                                try {
                                  t = window.parent.document.referrer;
                                } catch (e) {
                                  t = "";
                                }
                            }
                            return "" === t && (t = document.referrer), t;
                          }),
                          (s.addEventListener = function (e, t, n, r) {
                            return e.addEventListener
                              ? (e.addEventListener(t, n, r), !0)
                              : e.attachEvent
                                ? e.attachEvent("on" + t, n)
                                : void (e["on" + t] = n);
                          }),
                          (s.fromQuerystring = function (e, t) {
                            var n = new RegExp(
                              "^[^#]*[?&]" + e + "=([^&#]*)"
                            ).exec(t);
                            return n
                              ? decodeURIComponent(n[1].replace(/\+/g, " "))
                              : null;
                          }),
                          (s.resolveDynamicContexts = function (e) {
                            var t = Array.prototype.slice.call(arguments, 1);
                            return n(
                              o(e, function (e) {
                                if ("function" != typeof e) return e;
                                try {
                                  return e.apply(null, t);
                                } catch (e) {}
                              })
                            );
                          }),
                          (s.warn = function (e) {
                            "undefined" != typeof console &&
                              console.warn("Snowplow: " + e);
                          }),
                          (s.getCssClasses = function (e) {
                            return e.className.match(/\S+/g) || [];
                          }),
                          (s.getFilter = function (e, t) {
                            if (Array.isArray(e) || !i(e))
                              return function () {
                                return !0;
                              };
                            if (e.hasOwnProperty("filter")) return e.filter;
                            var n = e.hasOwnProperty("whitelist"),
                              r = e.whitelist || e.blacklist;
                            Array.isArray(r) || (r = [r]);
                            for (var a = {}, o = 0; o < r.length; o++)
                              a[r[o]] = !0;
                            return t
                              ? function (e) {
                                  return (
                                    (function (e, t) {
                                      var n,
                                        r = s.getCssClasses(e);
                                      for (n = 0; n < r.length; n++)
                                        if (t[r[n]]) return !0;
                                      return !1;
                                    })(e, a) === n
                                  );
                                }
                              : function (e) {
                                  return e.name in a === n;
                                };
                          }),
                          (s.getTransform = function (e) {
                            return i(e)
                              ? e.hasOwnProperty("transform")
                                ? e.transform
                                : function (e) {
                                    return e;
                                  }
                              : function (e) {
                                  return e;
                                };
                          }),
                          (s.decorateQuerystring = function (e, t, n) {
                            var r = t + "=" + n,
                              a = e.split("#"),
                              o = a[0].split("?"),
                              i = o.shift(),
                              c = o.join("?");
                            if (c) {
                              for (
                                var s = !0, u = c.split("&"), l = 0;
                                l < u.length;
                                l++
                              )
                                if (u[l].substr(0, t.length + 1) === t + "=") {
                                  (s = !1), (u[l] = r), (c = u.join("&"));
                                  break;
                                }
                              s && (c = r + "&" + c);
                            } else c = r;
                            return (a[0] = i + "?" + c), a.join("#");
                          }),
                          (s.attemptGetLocalStorage = function (e) {
                            try {
                              var t = localStorage.getItem(e + ".expires");
                              return null === t || +t > Date.now()
                                ? localStorage.getItem(e)
                                : (localStorage.removeItem(e),
                                  void localStorage.removeItem(e + ".expires"));
                            } catch (e) {}
                          }),
                          (s.attemptWriteLocalStorage = function (e, t) {
                            var n =
                              2 < arguments.length && void 0 !== arguments[2]
                                ? arguments[2]
                                : 63072e3;
                            try {
                              var r = Date.now() + 1e3 * n;
                              return (
                                localStorage.setItem(
                                  "".concat(e, ".expires"),
                                  r
                                ),
                                localStorage.setItem(e, t),
                                !0
                              );
                            } catch (e) {
                              return !1;
                            }
                          }),
                          (s.attemptGetSessionStorage = function (e) {
                            try {
                              return sessionStorage.getItem(e);
                            } catch (e) {
                              return;
                            }
                          }),
                          (s.attemptWriteSessionStorage = function (e, t) {
                            try {
                              return sessionStorage.setItem(e, t), !0;
                            } catch (e) {
                              return !1;
                            }
                          }),
                          (s.findRootDomain = function () {
                            for (
                              var e = "_sp_root_domain_test_",
                                t = e + new Date().getTime(),
                                n = "_test_value_" + new Date().getTime(),
                                r = window.location.hostname.split("."),
                                a = r.length - 1;
                              0 <= a;

                            ) {
                              var o = r.slice(a, r.length).join(".");
                              if (
                                (s.cookie(t, n, 0, "/", o), s.cookie(t) === n)
                              ) {
                                s.deleteCookie(t, o);
                                for (
                                  var i = s.getCookiesWithPrefix(e), c = 0;
                                  c < i.length;
                                  c++
                                )
                                  s.deleteCookie(i[c], o);
                                return o;
                              }
                              a -= 1;
                            }
                            return window.location.hostname;
                          }),
                          (s.isValueInArray = function (e, t) {
                            for (var n = 0; n < t.length; n++)
                              if (t[n] === e) return !0;
                            return !1;
                          }),
                          (s.deleteCookie = function (e, t) {
                            s.cookie(e, "", -1, "/", t);
                          }),
                          (s.getCookiesWithPrefix = function (e) {
                            for (
                              var t = document.cookie.split("; "),
                                n = [],
                                r = 0;
                              r < t.length;
                              r++
                            )
                              t[r].substring(0, e.length) === e && n.push(t[r]);
                            return n;
                          }),
                          (s.cookie = function (e, t, n, r, a, o, i) {
                            return 1 < arguments.length
                              ? (document.cookie =
                                  e +
                                  "=" +
                                  encodeURIComponent(t) +
                                  (n
                                    ? "; Expires=" +
                                      new Date(
                                        +new Date() + 1e3 * n
                                      ).toUTCString()
                                    : "") +
                                  (r ? "; Path=" + r : "") +
                                  (a ? "; Domain=" + a : "") +
                                  (o ? "; SameSite=" + o : "") +
                                  (i ? "; Secure" : ""))
                              : decodeURIComponent(
                                  (
                                    ("; " + document.cookie).split(
                                      "; " + e + "="
                                    )[1] || ""
                                  ).split(";")[0]
                                );
                          }),
                          (s.parseInt = function (e) {
                            var t = parseInt(e);
                            return isNaN(t) ? void 0 : t;
                          }),
                          (s.parseFloat = function (e) {
                            var t = parseFloat(e);
                            return isNaN(t) ? void 0 : t;
                          });
                      })();
                    },
                    {
                      "lodash/filter": 119,
                      "lodash/isObject": 134,
                      "lodash/isString": 137,
                      "lodash/isUndefined": 140,
                      "lodash/map": 142,
                    },
                  ],
                  172: [
                    function (e, t, n) {
                      !(function () {
                        var r = e("./helpers");
                        function a(e) {
                          var t, n;
                          if (
                            (function (e) {
                              return new RegExp(
                                "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                              ).test(e);
                            })(e)
                          )
                            try {
                              return (
                                (t =
                                  document.body.children[0].children[0]
                                    .children[0].children[0].children[0]
                                    .children[0].innerHTML),
                                (n = "You have reached the cached page for"),
                                t.slice(0, n.length) === n
                              );
                            } catch (e) {
                              return !1;
                            }
                        }
                        (void 0 !== n ? n : this).fixupUrl = function (
                          e,
                          t,
                          n
                        ) {
                          return (
                            "translate.googleusercontent.com" === e
                              ? ("" === n && (n = t),
                                (t = (function (e, t) {
                                  var n = new RegExp(
                                    "^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"
                                  ).exec(e);
                                  return r.fromQuerystring(t, n[1]);
                                })(t, "u")),
                                (e = r.getHostName(t)))
                              : ("cc.bingj.com" !== e &&
                                  "webcache.googleusercontent.com" !== e &&
                                  !a(e)) ||
                                ((t = document.links[0].href),
                                (e = r.getHostName(t))),
                            [e, t, n]
                          );
                        };
                      })();
                    },
                    { "./helpers": 171 },
                  ],
                  173: [
                    function (e, t, n) {
                      var m = e("lodash/isUndefined"),
                        v = e("./lib/helpers");
                      (void 0 !== n ? n : this).getLinkTrackingManager =
                        function (f, r, d) {
                          var a, o, p, i, c, s;
                          function u(e, t) {
                            for (
                              var n, r, a, o, i, c;
                              null !== (n = e.parentNode) &&
                              !m(n) &&
                              "A" !== (r = e.tagName.toUpperCase()) &&
                              "AREA" !== r;

                            )
                              e = n;
                            if (!m(e.href)) {
                              var s = e.hostname || v.getHostName(e.href),
                                u = s.toLowerCase(),
                                l = e.href.replace(s, u);
                              new RegExp(
                                "^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):",
                                "i"
                              ).test(l) ||
                                ((a = e.id),
                                (o = v.getCssClasses(e)),
                                (i = e.target),
                                (c = p ? e.innerHTML : null),
                                (l = unescape(l)),
                                f.trackLinkClick(
                                  l,
                                  a,
                                  o,
                                  i,
                                  c,
                                  d(v.resolveDynamicContexts(t, e))
                                ));
                            }
                          }
                          function l(r) {
                            return function (e) {
                              var t, n;
                              (t = (e = e || window.event).which || e.button),
                                (n = e.target || e.srcElement),
                                "click" === e.type
                                  ? n && u(n, r)
                                  : "mousedown" === e.type
                                    ? (1 !== t && 2 !== t) || !n
                                      ? (c = s = null)
                                      : ((c = t), (s = n))
                                    : "mouseup" === e.type &&
                                      (t === c && n === s && u(n, r),
                                      (c = s = null));
                            };
                          }
                          return {
                            configureLinkClickTracking: function (e, t, n, r) {
                              (p = n),
                                (i = r),
                                (o = t),
                                (a = v.getFilter(e, !0));
                            },
                            addClickListeners: function () {
                              var e,
                                t,
                                n = document.links;
                              for (e = 0; e < n.length; e++)
                                a(n[e]) &&
                                  !n[e][r] &&
                                  ((t = n[e]),
                                  o
                                    ? (v.addEventListener(
                                        t,
                                        "mouseup",
                                        l(i),
                                        !1
                                      ),
                                      v.addEventListener(
                                        t,
                                        "mousedown",
                                        l(i),
                                        !1
                                      ))
                                    : v.addEventListener(t, "click", l(i), !1),
                                  (n[e][r] = !0));
                            },
                          };
                        };
                    },
                    { "./lib/helpers": 171, "lodash/isUndefined": 140 },
                  ],
                  174: [
                    function (e, t, n) {
                      !(function () {
                        var S = e("lodash/mapValues"),
                          C = e("lodash/isString"),
                          j = e("lodash/map"),
                          O = e("./lib/detectors").localStorageAccessible,
                          T = e("./lib/helpers");
                        (void 0 !== n ? n : this).OutQueueManager = function (
                          e,
                          t,
                          n,
                          u,
                          r,
                          a,
                          o,
                          l,
                          f,
                          d
                        ) {
                          var p,
                            m,
                            v,
                            h,
                            g,
                            y = !1,
                            i =
                              null ===
                                (r = r.toLowerCase ? r.toLowerCase() : r) ||
                              !0 === r ||
                              "beacon" === r ||
                              "true" === r,
                            _ =
                              Boolean(i && navigator && navigator.sendBeacon) &&
                              i,
                            b = ("post" === r || _) && !("get" === r),
                            c = (b =
                              b &&
                              Boolean(
                                window.XMLHttpRequest &&
                                  "withCredentials" in new XMLHttpRequest()
                              ))
                              ? a
                              : "/i";
                          if (
                            ((o = (O() && u && b && o) || 1),
                            (p = "snowplowOutQueue_"
                              .concat(e, "_")
                              .concat(t, "_")
                              .concat(b ? "post2" : "get")),
                            (h = "spBeaconPreflight_".concat(e, "_").concat(t)),
                            u)
                          )
                            try {
                              v = JSON.parse(localStorage.getItem(p));
                            } catch (e) {}
                          function s(e) {
                            var t = S(e, function (e) {
                              return e.toString();
                            });
                            return {
                              evt: t,
                              bytes: (function (e) {
                                for (var t = 0, n = 0; n < e.length; n++) {
                                  var r = e.charCodeAt(n);
                                  r <= 127
                                    ? (t += 1)
                                    : r <= 2047
                                      ? (t += 2)
                                      : 55296 <= r && r <= 57343
                                        ? ((t += 4), n++)
                                        : (t += r < 65535 ? 3 : 4);
                                }
                                return t;
                              })(JSON.stringify(t)),
                            };
                          }
                          function w() {
                            for (
                              ;
                              v.length &&
                              "string" != typeof v[0] &&
                              "object" !== _typeof(v[0]);

                            )
                              v.shift();
                            if (v.length < 1) y = !1;
                            else {
                              if (!C(m))
                                throw "No Snowplow collector configured, cannot track";
                              y = !0;
                              var e = v[0];
                              if (b) {
                                var t = function (e) {
                                    for (var t = 0; t < e; t++) v.shift();
                                    u &&
                                      T.attemptWriteLocalStorage(
                                        p,
                                        JSON.stringify(v.slice(0, d))
                                      ),
                                      w();
                                  },
                                  n = k(m),
                                  r = setTimeout(function () {
                                    n.abort(), (y = !1);
                                  }, 5e3),
                                  a = (function (e) {
                                    for (
                                      var t = 0, n = 0;
                                      t < e.length &&
                                      ((n += e[t].bytes), !(l <= n));

                                    )
                                      t += 1;
                                    return t;
                                  })(v);
                                n.onreadystatechange = function () {
                                  4 === n.readyState &&
                                  200 <= n.status &&
                                  n.status < 400
                                    ? (clearTimeout(r),
                                      _ &&
                                        !g &&
                                        T.attemptWriteSessionStorage(h, !0),
                                      t(a))
                                    : 4 === n.readyState &&
                                      400 <= n.status &&
                                      (clearTimeout(r), (y = !1));
                                };
                                var o = j(v.slice(0, a), function (e) {
                                  return e.evt;
                                });
                                if (0 < o.length) {
                                  var i;
                                  if (
                                    (g =
                                      g || (_ && T.attemptGetSessionStorage(h)))
                                  ) {
                                    var c = new Blob([A(x(o))], {
                                      type: "application/json",
                                    });
                                    try {
                                      i = navigator.sendBeacon(m, c);
                                    } catch (e) {
                                      i = !1;
                                    }
                                  }
                                  !0 === i && t(a), (_ && i) || n.send(A(x(o)));
                                }
                              } else {
                                var s = new Image(1, 1);
                                (s.onload = function () {
                                  v.shift(),
                                    u &&
                                      T.attemptWriteLocalStorage(
                                        p,
                                        JSON.stringify(v.slice(0, d))
                                      ),
                                    w();
                                }),
                                  (s.onerror = function () {
                                    y = !1;
                                  }),
                                  (s.src = f
                                    ? m +
                                      e.replace(
                                        "?",
                                        "?stm=" + new Date().getTime() + "&"
                                      )
                                    : m + e);
                              }
                            }
                          }
                          function k(e) {
                            var t = new XMLHttpRequest();
                            return (
                              t.open("POST", e, !0),
                              (t.withCredentials = !0),
                              t.setRequestHeader(
                                "Content-Type",
                                "application/json; charset=UTF-8"
                              ),
                              t
                            );
                          }
                          function A(e) {
                            return JSON.stringify({
                              schema:
                                "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4",
                              data: e,
                            });
                          }
                          function x(e) {
                            for (
                              var t = new Date().getTime().toString(), n = 0;
                              n < e.length;
                              n++
                            )
                              e[n].stm = t;
                            return e;
                          }
                          return (
                            Array.isArray(v) || (v = []),
                            n.outQueues.push(v),
                            b &&
                              1 < o &&
                              n.bufferFlushers.push(function () {
                                y || w();
                              }),
                            {
                              enqueueRequest: function (e, t) {
                                if (((m = t + c), b)) {
                                  var n = s(e);
                                  if (n.bytes >= l)
                                    return (
                                      T.warn(
                                        "Event of size " +
                                          n.bytes +
                                          " is too long - the maximum size is " +
                                          l
                                      ),
                                      void k(m).send(A(x([n.evt])))
                                    );
                                  v.push(n);
                                } else
                                  v.push(
                                    (function (e) {
                                      var t = "?",
                                        n = { co: !0, cx: !0 },
                                        r = !0;
                                      for (var a in e)
                                        e.hasOwnProperty(a) &&
                                          !n.hasOwnProperty(a) &&
                                          (r ? (r = !1) : (t += "&"),
                                          (t +=
                                            encodeURIComponent(a) +
                                            "=" +
                                            encodeURIComponent(e[a])));
                                      for (var o in n)
                                        e.hasOwnProperty(o) &&
                                          n.hasOwnProperty(o) &&
                                          (t +=
                                            "&" +
                                            o +
                                            "=" +
                                            encodeURIComponent(e[o]));
                                      return t;
                                    })(e)
                                  );
                                var r = !1;
                                u &&
                                  (r = T.attemptWriteLocalStorage(
                                    p,
                                    JSON.stringify(v.slice(0, d))
                                  )),
                                  y || (r && !(v.length >= o)) || w();
                              },
                              executeQueue: w,
                            }
                          );
                        };
                      })();
                    },
                    {
                      "./lib/detectors": 170,
                      "./lib/helpers": 171,
                      "lodash/isString": 137,
                      "lodash/map": 142,
                      "lodash/mapValues": 143,
                    },
                  ],
                  175: [
                    function (e, t, n) {
                      !(function () {
                        e("uuid");
                        var s = e("lodash/forEach"),
                          u = e("lodash/filter"),
                          l = e("./lib/helpers"),
                          f = e("./in_queue"),
                          d = e("./tracker");
                        (void 0 !== n ? n : this).Snowplow = function (e, n) {
                          var t,
                            r = document,
                            a = window,
                            o = "js-2.14.0",
                            i = {
                              outQueues: [],
                              bufferFlushers: [],
                              expireDateTime: null,
                              hasLoaded: !1,
                              registeredOnLoadHandlers: [],
                              pageViewId: null,
                            };
                          function c() {
                            var e;
                            if (!i.hasLoaded)
                              for (
                                i.hasLoaded = !0, e = 0;
                                e < i.registeredOnLoadHandlers.length;
                                e++
                              )
                                i.registeredOnLoadHandlers[e]();
                            return !0;
                          }
                          return (
                            (a.Snowplow = {
                              getTrackerCf: function (e) {
                                var t = new d.Tracker(n, "", o, i, {});
                                return t.setCollectorCf(e), t;
                              },
                              getTrackerUrl: function (e) {
                                var t = new d.Tracker(n, "", o, i, {});
                                return t.setCollectorUrl(e), t;
                              },
                              getAsyncTracker: function () {
                                return new d.Tracker(n, "", o, i, {});
                              },
                            }),
                            l.addEventListener(
                              a,
                              "beforeunload",
                              function () {
                                var e;
                                if (
                                  (s(i.bufferFlushers, function (e) {
                                    e();
                                  }),
                                  i.expireDateTime)
                                )
                                  do {
                                    if (
                                      ((e = new Date()),
                                      0 ===
                                        u(i.outQueues, function (e) {
                                          return 0 < e.length;
                                        }).length)
                                    )
                                      break;
                                  } while (e.getTime() < i.expireDateTime);
                              },
                              !1
                            ),
                            r.addEventListener
                              ? l.addEventListener(
                                  r,
                                  "DOMContentLoaded",
                                  function e() {
                                    r.removeEventListener(
                                      "DOMContentLoaded",
                                      e,
                                      !1
                                    ),
                                      c();
                                  }
                                )
                              : r.attachEvent &&
                                (r.attachEvent(
                                  "onreadystatechange",
                                  function e() {
                                    "complete" === r.readyState &&
                                      (r.detachEvent("onreadystatechange", e),
                                      c());
                                  }
                                ),
                                r.documentElement.doScroll &&
                                  a === a.top &&
                                  (function t() {
                                    if (!i.hasLoaded) {
                                      try {
                                        r.documentElement.doScroll("left");
                                      } catch (e) {
                                        return void setTimeout(t, 0);
                                      }
                                      c();
                                    }
                                  })()),
                            new RegExp("WebKit").test(navigator.userAgent) &&
                              (t = setInterval(function () {
                                (i.hasLoaded ||
                                  /loaded|complete/.test(r.readyState)) &&
                                  (clearInterval(t), c());
                              }, 10)),
                            l.addEventListener(a, "load", c, !1),
                            new f.InQueueManager(d.Tracker, o, i, e, n)
                          );
                        };
                      })();
                    },
                    {
                      "./in_queue": 168,
                      "./lib/helpers": 171,
                      "./tracker": 176,
                      "lodash/filter": 119,
                      "lodash/forEach": 122,
                      uuid: 160,
                    },
                  ],
                  176: [
                    function (e, t, n) {
                      !(function () {
                        var at = e("lodash/forEach"),
                          ot = e("lodash/map"),
                          it = e("./lib/helpers"),
                          ct = e("./lib/proxies"),
                          st = e("./lib/detectors"),
                          ut = e("sha1"),
                          lt = e("./links"),
                          ft = e("./forms"),
                          dt = e("./errors"),
                          pt = e("./out_queue"),
                          mt = e("snowplow-tracker-core").trackerCore,
                          vt = e("./guard").productionize,
                          ht = e("uuid");
                        (void 0 !== n ? n : this).Tracker = function (
                          e,
                          t,
                          n,
                          f,
                          r
                        ) {
                          (r = r || {}).hasOwnProperty("post")
                            ? (r.eventMethod = !0 === r.post ? "post" : "get")
                            : (r.eventMethod = r.eventMethod || "post"),
                            r.hasOwnProperty("useStm") || (r.useStm = !0);
                          var m,
                            a,
                            v,
                            d,
                            o,
                            i,
                            h,
                            c,
                            p,
                            s,
                            u,
                            l,
                            g,
                            y,
                            _,
                            b,
                            w,
                            k,
                            A,
                            x,
                            S = Object.freeze({
                              consent: "consent",
                              contract: "contract",
                              legalObligation: "legal_obligation",
                              vitalInterests: "vital_interests",
                              publicTask: "public_task",
                              legitimateInterests: "legitimate_interests",
                            }),
                            C = mt(!0, function (e) {
                              !(function (e) {
                                var t,
                                  n = Math.round(new Date().getTime() / 1e3),
                                  r = Pe("id"),
                                  a = Pe("ses"),
                                  o = Ie("ses"),
                                  i = Ge(),
                                  c = i[0],
                                  s = i[1],
                                  u = i[2],
                                  l = i[3],
                                  f = i[4],
                                  d = i[5],
                                  p = i[6];
                                t = !!h && !!it.cookie(h);
                                if ((Q || t) && "none" != ae)
                                  return "localStorage" == ae
                                    ? (it.attemptWriteLocalStorage(r, ""),
                                      it.attemptWriteLocalStorage(a, ""))
                                    : ("cookie" != ae &&
                                        "cookieAndLocalStorage" != ae) ||
                                        (it.cookie(r, "", -1, K, H, W, J),
                                        it.cookie(a, "", -1, K, H, W, J));
                                "0" === c
                                  ? ((b = p),
                                    o ||
                                      "none" == ae ||
                                      (l++, (d = f), (b = ht.v4())),
                                    (le = l))
                                  : new Date().getTime() - se > 1e3 * X &&
                                    ((b = ht.v4()), le++);
                                e.add("vp", st.detectViewport()),
                                  e.add("ds", st.detectDocumentSize()),
                                  e.add("vid", le),
                                  e.add("sid", b),
                                  e.add("duid", s),
                                  e.add("uid", w),
                                  Se(),
                                  e.add("refr", Oe(m || F)),
                                  e.add("url", Oe(v || N)),
                                  "none" != ae && (Ue(s, u, le, n, d, b), ze());
                                se = new Date().getTime();
                              })(e),
                                (function (e, t) {
                                  var n,
                                    r = new Date();
                                  n = !!h && !!it.cookie(h);
                                  Q ||
                                    n ||
                                    (ve.enqueueRequest(e.build(), a),
                                    (f.expireDateTime = r.getTime() + t));
                                })(e, R);
                            }),
                            j = !1,
                            O = {},
                            T = {},
                            P = {},
                            I = document,
                            E = window,
                            D = navigator,
                            L = ct.fixupUrl(
                              I.domain,
                              E.location.href,
                              it.getReferrer()
                            ),
                            M = it.fixupDomain(L[0]),
                            N = L[1],
                            F = L[2],
                            z = r.hasOwnProperty("platform")
                              ? r.platform
                              : "web",
                            U = r.hasOwnProperty("postPath")
                              ? r.postPath
                              : "/com.snowplowanalytics.snowplow/tp2",
                            B = r.hasOwnProperty("appId") ? r.appId : "",
                            G = I.title,
                            R = r.hasOwnProperty("pageUnloadTimer")
                              ? r.pageUnloadTimer
                              : 500,
                            q =
                              !r.hasOwnProperty(
                                "resetActivityTrackingOnPageView"
                              ) || r.resetActivityTrackingOnPageView,
                            V = r.hasOwnProperty("cookieName")
                              ? r.cookieName
                              : "_sp_",
                            H = r.hasOwnProperty("cookieDomain")
                              ? r.cookieDomain
                              : null,
                            K = "/",
                            W = r.hasOwnProperty("cookieSameSite")
                              ? r.cookieSameSite
                              : "None",
                            J =
                              !r.hasOwnProperty("cookieSecure") ||
                              r.cookieSecure,
                            Y = D.doNotTrack || D.msDoNotTrack || E.doNotTrack,
                            Q =
                              !!r.hasOwnProperty("respectDoNotTrack") &&
                              r.respectDoNotTrack &&
                              ("yes" === Y || "1" === Y),
                            $ = r.hasOwnProperty("cookieLifetime")
                              ? r.cookieLifetime
                              : 63072e3,
                            X = r.hasOwnProperty("sessionCookieTimeout")
                              ? r.sessionCookieTimeout
                              : 1800,
                            Z = I.characterSet || I.charset,
                            ee =
                              !!r.hasOwnProperty("forceSecureTracker") &&
                              !0 === r.forceSecureTracker,
                            te =
                              !(
                                ee || !r.hasOwnProperty("forceUnsecureTracker")
                              ) && !0 === r.forceUnsecureTracker,
                            ne =
                              !r.hasOwnProperty("useLocalStorage") ||
                              (it.warn(
                                "argmap.useLocalStorage is deprecated. Use argmap.stateStorageStrategy instead."
                              ),
                              r.useLocalStorage),
                            re =
                              !r.hasOwnProperty("useCookies") ||
                              (it.warn(
                                "argmap.useCookies is deprecated. Use argmap.stateStorageStrategy instead."
                              ),
                              r.useCookies),
                            ae = r.hasOwnProperty("stateStorageStrategy")
                              ? r.stateStorageStrategy
                              : re || ne
                                ? re && ne
                                  ? "cookieAndLocalStorage"
                                  : re
                                    ? "cookie"
                                    : "localStorage"
                                : "none",
                            oe = D.userLanguage || D.language,
                            ie = st.detectBrowserFeatures(
                              "cookie" == ae || "cookieAndLocalStorage" == ae,
                              Pe("testcookie")
                            ),
                            ce = e + "_" + t,
                            se = new Date().getTime(),
                            ue = ut,
                            le = 1,
                            fe = { transaction: {}, items: [] },
                            de = lt.getLinkTrackingManager(C, ce, qe),
                            pe = ft.getFormTrackingManager(C, ce, qe),
                            me = dt.errorManager(C),
                            ve = new pt.OutQueueManager(
                              e,
                              t,
                              f,
                              "localStorage" == ae ||
                                "cookieAndLocalStorage" == ae,
                              r.eventMethod,
                              U,
                              r.bufferSize,
                              r.maxPostBytes || 4e4,
                              r.useStm,
                              r.maxLocalStorageQueueSize || 1e3
                            ),
                            he = !1,
                            ge = r.contexts || {},
                            ye = [],
                            _e = [],
                            be = !1,
                            we = !1,
                            ke = {
                              enabled: !1,
                              installed: !1,
                              configurations: {},
                            },
                            Ae = {};
                          for (var xe in (r.hasOwnProperty(
                            "discoverRootDomain"
                          ) &&
                            r.discoverRootDomain &&
                            (H = it.findRootDomain()),
                          ge.gaCookies &&
                            ye.push(
                              ((k = {}),
                              at(
                                [
                                  "__utma",
                                  "__utmb",
                                  "__utmc",
                                  "__utmv",
                                  "__utmz",
                                  "_ga",
                                  "_ym_uid",
                                  "_fbp",
                                ],
                                function (e) {
                                  var t = it.cookie(e);
                                  t && (k[e] = t);
                                }
                              ),
                              {
                                schema:
                                  "iglu:ru.andata/master_cookies/jsonschema/1-0-0",
                                data: k,
                              })
                            ),
                          ge.geolocation && We(),
                          C.setBase64Encoding(
                            !r.hasOwnProperty("encodeBase64") || r.encodeBase64
                          ),
                          C.setTrackerVersion(n),
                          C.setTrackerNamespace(t),
                          C.setAppId(B),
                          C.setPlatform(z),
                          C.setTimezone(st.detectTimezone()),
                          C.addPayloadPair("lang", oe),
                          C.addPayloadPair("cs", Z),
                          ie))
                            Object.prototype.hasOwnProperty.call(ie, xe) &&
                              ("res" === xe || "cd" === xe || "cookie" === xe
                                ? C.addPayloadPair(xe, ie[xe])
                                : C.addPayloadPair("f_" + xe, ie[xe]));
                          function Se() {
                            (L = ct.fixupUrl(
                              I.domain,
                              E.location.href,
                              it.getReferrer()
                            ))[1] !== N && (F = it.getReferrer(N)),
                              (M = it.fixupDomain(L[0])),
                              (N = L[1]);
                          }
                          function Ce() {
                            var e = new Date().getTime();
                            this.href &&
                              (this.href = it.decorateQuerystring(
                                this.href,
                                "_sp",
                                _ + "." + e
                              ));
                          }
                          function je(e) {
                            for (var t = 0; t < I.links.length; t++) {
                              var n = I.links[t];
                              !n.spDecorationEnabled &&
                                e(n) &&
                                (it.addEventListener(n, "click", Ce, !0),
                                it.addEventListener(n, "mousedown", Ce, !0),
                                (n.spDecorationEnabled = !0));
                            }
                          }
                          function Oe(e) {
                            var t;
                            return (
                              o &&
                                ((t = new RegExp("#.*")),
                                (e = e.replace(t, ""))),
                              i &&
                                ((t = new RegExp("[{}]", "g")),
                                (e = e.replace(t, ""))),
                              e
                            );
                          }
                          function Te(e) {
                            var t = new RegExp("^([a-z]+):").exec(e);
                            return t ? t[1] : null;
                          }
                          function Pe(e) {
                            return V + e + "." + y;
                          }
                          function Ie(e) {
                            var t = Pe(e);
                            return "localStorage" == ae
                              ? it.attemptGetLocalStorage(t)
                              : "cookie" == ae || "cookieAndLocalStorage" == ae
                                ? it.cookie(t)
                                : void 0;
                          }
                          function Ee() {
                            Se(), (y = ue((H || M) + (K || "/")).slice(0, 4));
                          }
                          function De() {
                            var e = new Date();
                            p = e.getTime();
                          }
                          function Le() {
                            !(function () {
                              var e = Me(),
                                t = e[0];
                              t < s ? (s = t) : u < t && (u = t);
                              var n = e[1];
                              n < l ? (l = n) : g < n && (g = n);
                            })(),
                              De();
                          }
                          function Me() {
                            var e =
                              I.compatMode && "BackCompat" !== I.compatMode
                                ? I.documentElement
                                : I.body;
                            return [
                              e.scrollLeft || E.pageXOffset,
                              e.scrollTop || E.pageYOffset,
                            ];
                          }
                          function Ne() {
                            var e = Me(),
                              t = e[0];
                            u = s = t;
                            var n = e[1];
                            g = l = n;
                          }
                          function Fe(e) {
                            var t = Math.round(e);
                            if (!isNaN(t)) return t;
                          }
                          function ze() {
                            Be(Pe("ses"), "*", X);
                          }
                          function Ue(e, t, n, r, a, o) {
                            Be(
                              Pe("id"),
                              e +
                                "." +
                                t +
                                "." +
                                n +
                                "." +
                                r +
                                "." +
                                a +
                                "." +
                                o,
                              $
                            );
                          }
                          function Be(e, t, n) {
                            "localStorage" == ae
                              ? it.attemptWriteLocalStorage(e, t, n)
                              : ("cookie" != ae &&
                                  "cookieAndLocalStorage" != ae) ||
                                it.cookie(e, t, n, K, H, W, J);
                          }
                          function Ge() {
                            if ("none" == ae) return [];
                            var e,
                              t = new Date(),
                              n = Math.round(t.getTime() / 1e3),
                              r = Ie("id");
                            return (
                              r
                                ? (e = r.split(".")).unshift("0")
                                : (e = ["1", _, n, 0, n, ""]),
                              e[6] || (e[6] = ht.v4()),
                              e
                            );
                          }
                          function Re(e) {
                            return ee
                              ? "https://" + e
                              : te
                                ? "http://" + e
                                : ("https:" === I.location.protocol
                                    ? "https"
                                    : "http") +
                                  "://" +
                                  e;
                          }
                          function qe(e) {
                            var t = ye.concat(e || []);
                            if (
                              (ge.webPage &&
                                t.push({
                                  schema:
                                    "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
                                  data: { id: Ve() },
                                }),
                              ge.performanceTiming)
                            ) {
                              var n = (function () {
                                var e = [
                                    "navigationStart",
                                    "redirectStart",
                                    "redirectEnd",
                                    "fetchStart",
                                    "domainLookupStart",
                                    "domainLookupEnd",
                                    "connectStart",
                                    "secureConnectionStart",
                                    "connectEnd",
                                    "requestStart",
                                    "responseStart",
                                    "responseEnd",
                                    "unloadEventStart",
                                    "unloadEventEnd",
                                    "domLoading",
                                    "domInteractive",
                                    "domContentLoadedEventStart",
                                    "domContentLoadedEventEnd",
                                    "domComplete",
                                    "loadEventStart",
                                    "loadEventEnd",
                                    "msFirstPaint",
                                    "chromeFirstPaint",
                                    "requestEnd",
                                    "proxyStart",
                                    "proxyEnd",
                                  ],
                                  t =
                                    E.performance ||
                                    E.mozPerformance ||
                                    E.msPerformance ||
                                    E.webkitPerformance;
                                if (t) {
                                  var n = {};
                                  for (var r in t.timing)
                                    it.isValueInArray(r, e) &&
                                      null !== t.timing[r] &&
                                      (n[r] = t.timing[r]);
                                  return (
                                    delete n.requestEnd,
                                    {
                                      schema:
                                        "iglu:org.w3/PerformanceTiming/jsonschema/1-0-0",
                                      data: n,
                                    }
                                  );
                                }
                              })();
                              n && t.push(n);
                            }
                            if (E.optimizely) {
                              if (ge.optimizelySummary) {
                                var r = ot(
                                  (function () {
                                    var n = He("state"),
                                      r = He("experiments");
                                    return ot(
                                      n && r && n.activeExperiments,
                                      function (e) {
                                        var t = r[e];
                                        return {
                                          activeExperimentId: e.toString(),
                                          variation:
                                            n.variationIdsMap[e][0].toString(),
                                          conditional: t && t.conditional,
                                          manual: t && t.manual,
                                          name: t && t.name,
                                        };
                                      }
                                    );
                                  })(),
                                  function (e) {
                                    return {
                                      schema:
                                        "iglu:com.optimizely.snowplow/optimizely_summary/jsonschema/1-0-0",
                                      data: e,
                                    };
                                  }
                                );
                                at(r, function (e) {
                                  t.push(e);
                                });
                              }
                              if (ge.optimizelyXSummary) {
                                r = ot(
                                  (function () {
                                    var e = Ke("state"),
                                      t = e.getActiveExperimentIds(),
                                      o = e.getVariationMap(),
                                      i = Ke("visitor");
                                    return ot(t, function (e) {
                                      var t = o[e],
                                        n =
                                          (t && t.name && t.name.toString()) ||
                                          null,
                                        r = t && t.id,
                                        a =
                                          (i &&
                                            i.visitorId &&
                                            i.visitorId.toString()) ||
                                          null;
                                      return {
                                        experimentId: parseInt(e) || null,
                                        variationName: n,
                                        variation: parseInt(r) || null,
                                        visitorId: a,
                                      };
                                    });
                                  })(),
                                  function (e) {
                                    return {
                                      schema:
                                        "iglu:com.optimizely.optimizelyx/summary/jsonschema/1-0-0",
                                      data: e,
                                    };
                                  }
                                );
                                at(r, function (e) {
                                  t.push(e);
                                });
                              }
                              if (ge.optimizelyExperiments)
                                for (
                                  var a = (function () {
                                      var e = He("experiments");
                                      if (e) {
                                        var t = [];
                                        for (var n in e)
                                          if (e.hasOwnProperty(n)) {
                                            var r = {};
                                            r.id = n;
                                            var a = e[n];
                                            (r.code = a.code),
                                              (r.manual = a.manual),
                                              (r.conditional = a.conditional),
                                              (r.name = a.name),
                                              (r.variationIds =
                                                a.variation_ids),
                                              t.push({
                                                schema:
                                                  "iglu:com.optimizely/experiment/jsonschema/1-0-0",
                                                data: r,
                                              });
                                          }
                                        return t;
                                      }
                                      return [];
                                    })(),
                                    o = 0;
                                  o < a.length;
                                  o++
                                )
                                  t.push(a[o]);
                              if (ge.optimizelyStates) {
                                var i = (function () {
                                  var e = [],
                                    t = He("experiments");
                                  if (t)
                                    for (var n in t)
                                      t.hasOwnProperty(n) && e.push(n);
                                  var r = He("state");
                                  if (r) {
                                    for (
                                      var a = [],
                                        o = r.activeExperiments || [],
                                        i = 0;
                                      i < e.length;
                                      i++
                                    ) {
                                      var c = e[i],
                                        s = {};
                                      (s.experimentId = c),
                                        (s.isActive = it.isValueInArray(
                                          e[i],
                                          o
                                        ));
                                      var u = r.variationMap || {};
                                      s.variationIndex = u[c];
                                      var l = r.variationNamesMap || {};
                                      s.variationName = l[c];
                                      var f = r.variationIdsMap || {};
                                      f[c] &&
                                        1 === f[c].length &&
                                        (s.variationId = f[c][0]),
                                        a.push({
                                          schema:
                                            "iglu:com.optimizely/state/jsonschema/1-0-0",
                                          data: s,
                                        });
                                    }
                                    return a;
                                  }
                                  return [];
                                })();
                                for (o = 0; o < i.length; o++) t.push(i[o]);
                              }
                              if (ge.optimizelyVariations) {
                                var c = (function () {
                                  var e = He("variations");
                                  if (e) {
                                    var t = [];
                                    for (var n in e)
                                      if (e.hasOwnProperty(n)) {
                                        var r = {};
                                        r.id = n;
                                        var a = e[n];
                                        (r.name = a.name),
                                          (r.code = a.code),
                                          t.push({
                                            schema:
                                              "iglu:com.optimizely/variation/jsonschema/1-0-0",
                                            data: r,
                                          });
                                      }
                                    return t;
                                  }
                                  return [];
                                })();
                                for (o = 0; o < c.length; o++) t.push(c[o]);
                              }
                              if (ge.optimizelyVisitor) {
                                var s = (function () {
                                  var e = He("visitor");
                                  if (e) {
                                    var t = {};
                                    (t.browser = e.browser),
                                      (t.browserVersion = e.browserVersion),
                                      (t.device = e.device),
                                      (t.deviceType = e.deviceType),
                                      (t.ip = e.ip);
                                    var n = e.platform || {};
                                    (t.platformId = n.id),
                                      (t.platformVersion = n.version);
                                    var r = e.location || {};
                                    return (
                                      (t.locationCity = r.city),
                                      (t.locationRegion = r.region),
                                      (t.locationCountry = r.country),
                                      (t.mobile = e.mobile),
                                      (t.mobileId = e.mobileId),
                                      (t.referrer = e.referrer),
                                      (t.os = e.os),
                                      {
                                        schema:
                                          "iglu:com.optimizely/visitor/jsonschema/1-0-0",
                                        data: t,
                                      }
                                    );
                                  }
                                })();
                                s && t.push(s);
                              }
                              if (ge.optimizelyAudiences) {
                                var u = (function () {
                                  var e = He("visitor", "audiences");
                                  if (e) {
                                    var t = [];
                                    for (var n in e)
                                      if (e.hasOwnProperty(n)) {
                                        var r = { id: n, isMember: e[n] };
                                        t.push({
                                          schema:
                                            "iglu:com.optimizely/visitor_audience/jsonschema/1-0-0",
                                          data: r,
                                        });
                                      }
                                    return t;
                                  }
                                  return [];
                                })();
                                for (o = 0; o < u.length; o++) t.push(u[o]);
                              }
                              if (ge.optimizelyDimensions) {
                                var l = (function () {
                                  var e = He("visitor", "dimensions");
                                  if (e) {
                                    var t = [];
                                    for (var n in e)
                                      if (e.hasOwnProperty(n)) {
                                        var r = { id: n, value: e[n] };
                                        t.push({
                                          schema:
                                            "iglu:com.optimizely/visitor_dimension/jsonschema/1-0-0",
                                          data: r,
                                        });
                                      }
                                    return t;
                                  }
                                  return [];
                                })();
                                for (o = 0; o < l.length; o++) t.push(l[o]);
                              }
                            }
                            if (ge.parrable) {
                              var f = (function () {
                                var e = window._hawk;
                                if (e) {
                                  var t = { encryptedId: null, optout: null };
                                  t.encryptedId = e.browserid;
                                  var n = new RegExp(
                                      "(?:^|;)\\s?" +
                                        "_parrable_hawk_optout".replace(
                                          /([.*+?^=!:${}()|[\]\/\\])/g,
                                          "\\$1"
                                        ) +
                                        "=(.*?)(?:;|$)",
                                      "i"
                                    ),
                                    r = document.cookie.match(n);
                                  return (
                                    (t.optout =
                                      r && decodeURIComponent(r[1])
                                        ? r && decodeURIComponent(r[1])
                                        : "false"),
                                    {
                                      schema:
                                        "iglu:com.parrable/encrypted_payload/jsonschema/1-0-0",
                                      data: t,
                                    }
                                  );
                                }
                              })();
                              f && t.push(f);
                            }
                            if (ge.gdprBasis && Ae.gdprBasis) {
                              var d = (function () {
                                if (Ae.gdprBasis)
                                  return {
                                    schema:
                                      "iglu:com.snowplowanalytics.snowplow/gdpr/jsonschema/1-0-0",
                                    data: {
                                      basisForProcessing: Ae.gdprBasis,
                                      documentId: Ae.gdprDocId || null,
                                      documentVersion: Ae.gdprDocVer || null,
                                      documentDescription:
                                        Ae.gdprDocDesc || null,
                                    },
                                  };
                              })();
                              d && t.push(d);
                            }
                            return t;
                          }
                          function Ve() {
                            return (
                              null == f.pageViewId && (f.pageViewId = ht.v4()),
                              f.pageViewId
                            );
                          }
                          function He(e, t) {
                            var n;
                            return (
                              E.optimizely &&
                                E.optimizely.data &&
                                ((n = E.optimizely.data[e]),
                                void 0 !== t && void 0 !== n && (n = n[t])),
                              n
                            );
                          }
                          function Ke(e, t) {
                            var n;
                            return (
                              E.optimizely &&
                                "function" == typeof E.optimizely.get &&
                                ((n = E.optimizely.get(e)),
                                void 0 !== t && void 0 !== n && (n = n[t])),
                              n
                            );
                          }
                          function We() {
                            !he &&
                              D.geolocation &&
                              D.geolocation.getCurrentPosition &&
                              ((he = !0),
                              D.geolocation.getCurrentPosition(function (e) {
                                var t = e.coords,
                                  n = {
                                    schema:
                                      "iglu:com.snowplowanalytics.snowplow/geolocation_context/jsonschema/1-1-0",
                                    data: {
                                      latitude: t.latitude,
                                      longitude: t.longitude,
                                      latitudeLongitudeAccuracy: t.accuracy,
                                      altitude: t.altitude,
                                      altitudeAccuracy: t.altitudeAccuracy,
                                      bearing: t.heading,
                                      speed: t.speed,
                                      timestamp: Math.round(e.timestamp),
                                    },
                                  };
                                ye.push(n);
                              }));
                          }
                          function Je(e, t) {
                            return (e || []).concat(t ? t() : []);
                          }
                          function Ye(e, t, n, r) {
                            Se(),
                              we &&
                                ((be && null != f.pageViewId) ||
                                  (f.pageViewId = ht.v4())),
                              (we = !0),
                              (G = I.title),
                              (d = e);
                            var a = it.fixupTitle(d || G);
                            C.trackPageView(
                              Oe(v || N),
                              a,
                              Oe(m || F),
                              qe(Je(t, n)),
                              r
                            );
                            var o = new Date(),
                              i = !1;
                            if (ke.enabled && !ke.installed) {
                              i = ke.installed = !0;
                              var c = {
                                update: function () {
                                  if (
                                    "undefined" != typeof window &&
                                    "function" == typeof window.addEventListener
                                  ) {
                                    var e = !1,
                                      t = Object.defineProperty({}, "passive", {
                                        get: function () {
                                          e = !0;
                                        },
                                      }),
                                      n = function () {};
                                    window.addEventListener(
                                      "testPassiveEventSupport",
                                      n,
                                      t
                                    ),
                                      window.removeEventListener(
                                        "testPassiveEventSupport",
                                        n,
                                        t
                                      ),
                                      (c.hasSupport = e);
                                  }
                                },
                              };
                              c.update();
                              var s =
                                "onwheel" in document.createElement("div")
                                  ? "wheel"
                                  : void 0 !== document.onmousewheel
                                    ? "mousewheel"
                                    : "DOMMouseScroll";
                              Object.prototype.hasOwnProperty.call(
                                c,
                                "hasSupport"
                              )
                                ? it.addEventListener(I, s, De, { passive: !0 })
                                : it.addEventListener(I, s, De),
                                Ne(),
                                it.addEventListener(I, "click", De),
                                it.addEventListener(I, "mouseup", De),
                                it.addEventListener(I, "mousedown", De),
                                it.addEventListener(I, "mousemove", De),
                                it.addEventListener(E, "scroll", Le),
                                it.addEventListener(I, "keypress", De),
                                it.addEventListener(I, "keydown", De),
                                it.addEventListener(I, "keyup", De),
                                it.addEventListener(E, "resize", De),
                                it.addEventListener(E, "focus", De),
                                it.addEventListener(E, "blur", De);
                            }
                            if (ke.enabled && (q || i))
                              for (var u in ((p = o.getTime()),
                              ke.configurations))
                                if (ke.configurations.hasOwnProperty(u)) {
                                  var l = ke.configurations[u];
                                  clearInterval(l.activityInterval),
                                    (l.activityInterval = Qe(
                                      _objectSpread({}, l, {
                                        configLastActivityTime: p,
                                        context: Je(t, n),
                                      })
                                    ));
                                }
                          }
                          function Qe(e) {
                            var t = e.configHeartBeatTimer,
                              n = e.configMinimumVisitLength,
                              r = e.configLastActivityTime,
                              a = e.callback,
                              o = e.context;
                            return setInterval(function () {
                              var e = new Date();
                              p + t > e.getTime() &&
                                r + 1e3 * n < e.getTime() &&
                                (Se(),
                                a({
                                  context: o,
                                  pageViewId: Ve(),
                                  minXOffset: s,
                                  minYOffset: l,
                                  maxXOffset: u,
                                  maxYOffset: g,
                                }),
                                Ne());
                            }, t);
                          }
                          function $e(e, t, n) {
                            return e === parseInt(e, 10) &&
                              t === parseInt(t, 10)
                              ? {
                                  configMinimumVisitLength: e,
                                  configHeartBeatTimer: 1e3 * t,
                                  activityInterval: null,
                                  callback: n,
                                }
                              : (it.warn(
                                  "Activity tracking not enabled, please provide integer values for minimumVisitLength and heartBeatDelay."
                                ),
                                {});
                          }
                          function Xe(e) {
                            var t = e.context,
                              n = e.minXOffset,
                              r = e.minYOffset,
                              a = e.maxXOffset,
                              o = e.maxYOffset,
                              i = I.title;
                            i !== G && ((G = i), (d = null)),
                              C.trackPagePing(
                                Oe(v || N),
                                it.fixupTitle(d || G),
                                Oe(m || F),
                                Fe(n),
                                Fe(a),
                                Fe(r),
                                Fe(o),
                                qe(t)
                              );
                          }
                          function Ze(e, t) {
                            return "" !== e
                              ? e + t.charAt(0).toUpperCase() + t.slice(1)
                              : t;
                          }
                          function et(t) {
                            var e,
                              n,
                              r,
                              a = ["", "webkit", "ms", "moz"];
                            if (!c)
                              for (n = 0; n < a.length; n++) {
                                if (I[Ze((r = a[n]), "hidden")]) {
                                  "prerender" === I[Ze(r, "visibilityState")] &&
                                    (e = !0);
                                  break;
                                }
                                if (!1 === I[Ze(r, "hidden")]) break;
                              }
                            e
                              ? it.addEventListener(
                                  I,
                                  r + "visibilitychange",
                                  function e() {
                                    I.removeEventListener(
                                      r + "visibilitychange",
                                      e,
                                      !1
                                    ),
                                      t();
                                  }
                                )
                              : t();
                          }
                          function tt() {
                            P = j ? O : T;
                          }
                          Ee(),
                            (A = "none" != ae && !!Ie("ses")),
                            (x = Ge())[1]
                              ? (_ = x[1])
                              : ((_ = ht.v4()), (x[1] = _)),
                            (b = x[6]),
                            A ||
                              (x[3]++,
                              (b = ht.v4()),
                              (x[6] = b),
                              (x[5] = x[4])),
                            "none" != ae &&
                              (ze(),
                              (x[4] = Math.round(new Date().getTime() / 1e3)),
                              x.shift(),
                              Ue.apply(null, x)),
                            r.crossDomainLinker && je(r.crossDomainLinker);
                          var nt =
                              "User Fingerprinting is no longer supported. This function will be removed in a future release.",
                            rt =
                              " is deprecated. Instead use the argmap argument on tracker initialisation: ";
                          return (
                            (O.getDomainSessionIndex = function () {
                              return le;
                            }),
                            (O.getPageViewId = function () {
                              return Ve();
                            }),
                            (O.newSession = function () {
                              var e = Math.round(new Date().getTime() / 1e3),
                                t = (Ie("ses"), Ge()),
                                n = t[0],
                                r = t[1],
                                a = t[2],
                                o = t[3],
                                i = t[4],
                                c = t[5],
                                s = t[6];
                              "0" === n
                                ? ((b = s),
                                  "none" != ae && (o++, (c = i), (b = ht.v4())),
                                  (le = o),
                                  ze())
                                : ((b = ht.v4()), le++),
                                "none" != ae && (Ue(r, a, le, e, c, b), ze()),
                                (se = new Date().getTime());
                            }),
                            (O.getCookieName = function (e) {
                              return Pe(e);
                            }),
                            (O.getUserId = function () {
                              return w;
                            }),
                            (O.getDomainUserId = function () {
                              return Ge()[1];
                            }),
                            (O.getDomainUserInfo = function () {
                              return Ge();
                            }),
                            (O.getUserFingerprint = function () {
                              return it.warn(nt), 0;
                            }),
                            (O.setAppId = function (e) {
                              it.warn("setAppId" + rt + "appId"), C.setAppId(e);
                            }),
                            (O.setReferrerUrl = function (e) {
                              m = e;
                            }),
                            (O.setCustomUrl = function (e) {
                              Se(),
                                (v = (function (e, t) {
                                  var n;
                                  return Te(t)
                                    ? t
                                    : "/" === t.slice(0, 1)
                                      ? Te(e) + "://" + it.getHostName(e) + t
                                      : (0 <= (n = (e = Oe(e)).indexOf("?")) &&
                                          (e = e.slice(0, n)),
                                        (n = e.lastIndexOf("/")) !==
                                          e.length - 1 &&
                                          (e = e.slice(0, n + 1)),
                                        e + t);
                                })(N, e));
                            }),
                            (O.setDocumentTitle = function (e) {
                              (G = I.title), (d = e);
                            }),
                            (O.discardHashTag = function (e) {
                              o = e;
                            }),
                            (O.discardBrace = function (e) {
                              i = e;
                            }),
                            (O.setCookieNamePrefix = function (e) {
                              it.warn(
                                "setCookieNamePrefix" + rt + "cookieName"
                              ),
                                (V = e);
                            }),
                            (O.setCookieDomain = function (e) {
                              it.warn("setCookieDomain" + rt + "cookieDomain"),
                                (H = it.fixupDomain(e)),
                                Ee();
                            }),
                            (O.setCookiePath = function (e) {
                              (K = e), Ee();
                            }),
                            (O.setVisitorCookieTimeout = function (e) {
                              $ = e;
                            }),
                            (O.setSessionCookieTimeout = function (e) {
                              it.warn(
                                "setSessionCookieTimeout" +
                                  rt +
                                  "sessionCookieTimeout"
                              ),
                                (X = e);
                            }),
                            (O.setUserFingerprintSeed = function () {
                              it.warn(nt);
                            }),
                            (O.enableUserFingerprint = function () {
                              it.warn(nt);
                            }),
                            (O.respectDoNotTrack = function (e) {
                              it.warn(
                                "respectDoNotTrack" + rt + "respectDoNotTrack"
                              );
                              var t = D.doNotTrack || D.msDoNotTrack;
                              Q = e && ("yes" === t || "1" === t);
                            }),
                            (O.crossDomainLinker = function (e) {
                              je(e);
                            }),
                            (O.enableLinkClickTracking = function (e, t, n, r) {
                              f.hasLoaded
                                ? (de.configureLinkClickTracking(e, t, n, r),
                                  de.addClickListeners())
                                : f.registeredOnLoadHandlers.push(function () {
                                    de.configureLinkClickTracking(e, t, n, r),
                                      de.addClickListeners();
                                  });
                            }),
                            (O.refreshLinkClickTracking = function () {
                              f.hasLoaded
                                ? de.addClickListeners()
                                : f.registeredOnLoadHandlers.push(function () {
                                    de.addClickListeners();
                                  });
                            }),
                            (O.enableActivityTracking = function (e, t) {
                              (ke.enabled = !0),
                                (ke.configurations.pagePing = $e(e, t, Xe));
                            }),
                            (O.enableActivityTrackingCallback = function (
                              e,
                              t,
                              n
                            ) {
                              (ke.enabled = !0),
                                (ke.configurations.callback = $e(e, t, n));
                            }),
                            (O.updatePageActivity = function () {
                              De();
                            }),
                            (O.enableFormTracking = function (e, t) {
                              f.hasLoaded
                                ? (pe.configureFormTracking(e),
                                  pe.addFormListeners(t))
                                : f.registeredOnLoadHandlers.push(function () {
                                    pe.configureFormTracking(e),
                                      pe.addFormListeners(t);
                                  });
                            }),
                            (O.killFrame = function () {
                              E.location !== E.top.location &&
                                (E.top.location = E.location);
                            }),
                            (O.redirectFile = function (e) {
                              "file:" === E.location.protocol &&
                                (E.location = e);
                            }),
                            (O.setOptOutCookie = function (e) {
                              h = e;
                            }),
                            (O.setCountPreRendered = function (e) {
                              c = e;
                            }),
                            (O.setUserId = function (e) {
                              w = e;
                            }),
                            (O.identifyUser = function (e) {
                              setUserId(e);
                            }),
                            (O.setUserIdFromLocation = function (e) {
                              Se(), (w = it.fromQuerystring(e, N));
                            }),
                            (O.setUserIdFromReferrer = function (e) {
                              Se(), (w = it.fromQuerystring(e, F));
                            }),
                            (O.setUserIdFromCookie = function (e) {
                              w = it.cookie(e);
                            }),
                            (O.setCollectorCf = function (e) {
                              a = (function (e) {
                                return Re(e + ".cloudfront.net");
                              })(e);
                            }),
                            (O.setCollectorUrl = function (e) {
                              a = Re(e);
                            }),
                            (O.setPlatform = function (e) {
                              it.warn("setPlatform" + rt + "platform"),
                                C.setPlatform(e);
                            }),
                            (O.encodeBase64 = function (e) {
                              it.warn("encodeBase64" + rt + "encodeBase64"),
                                C.setBase64Encoding(e);
                            }),
                            (O.flushBuffer = function () {
                              ve.executeQueue();
                            }),
                            (O.enableGeolocationContext = We),
                            (O.trackPageView = function (e, t, n, r) {
                              et(function () {
                                Ye(e, t, n, r);
                              });
                            }),
                            (O.trackStructEvent = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i
                            ) {
                              et(function () {
                                C.trackStructEvent(e, t, n, r, a, qe(o), i);
                              });
                            }),
                            (O.trackSelfDescribingEvent = function (e, t, n) {
                              et(function () {
                                C.trackSelfDescribingEvent(e, qe(t), n);
                              });
                            }),
                            (O.trackUnstructEvent = function (e, t, n) {
                              et(function () {
                                C.trackSelfDescribingEvent(e, qe(t), n);
                              });
                            }),
                            (O.addTrans = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c,
                              s,
                              u,
                              l
                            ) {
                              fe.transaction = {
                                orderId: e,
                                affiliation: t,
                                total: n,
                                tax: r,
                                shipping: a,
                                city: o,
                                state: i,
                                country: c,
                                currency: s,
                                context: u,
                                tstamp: l,
                              };
                            }),
                            (O.addItem = function (e, t, n, r, a, o, i, c, s) {
                              fe.items.push({
                                orderId: e,
                                sku: t,
                                name: n,
                                category: r,
                                price: a,
                                quantity: o,
                                currency: i,
                                context: c,
                                tstamp: s,
                              });
                            }),
                            (O.trackTrans = function () {
                              et(function () {
                                !(function (e, t, n, r, a, o, i, c, s, u, l) {
                                  C.trackEcommerceTransaction(
                                    e,
                                    t,
                                    n,
                                    r,
                                    a,
                                    o,
                                    i,
                                    c,
                                    s,
                                    qe(u),
                                    l
                                  );
                                })(
                                  fe.transaction.orderId,
                                  fe.transaction.affiliation,
                                  fe.transaction.total,
                                  fe.transaction.tax,
                                  fe.transaction.shipping,
                                  fe.transaction.city,
                                  fe.transaction.state,
                                  fe.transaction.country,
                                  fe.transaction.currency,
                                  fe.transaction.context,
                                  fe.transaction.tstamp
                                );
                                for (var e = 0; e < fe.items.length; e++) {
                                  var t = fe.items[e];
                                  (n = t.orderId),
                                    (r = t.sku),
                                    (a = t.name),
                                    (o = t.category),
                                    (i = t.price),
                                    (c = t.quantity),
                                    (s = t.currency),
                                    (u = t.context),
                                    (l = t.tstamp),
                                    C.trackEcommerceTransactionItem(
                                      n,
                                      r,
                                      a,
                                      o,
                                      i,
                                      c,
                                      s,
                                      qe(u),
                                      l
                                    );
                                }
                                var n, r, a, o, i, c, s, u, l;
                                fe = { transaction: {}, items: [] };
                              });
                            }),
                            (O.trackLinkClick = function (e, t, n, r, a, o, i) {
                              et(function () {
                                C.trackLinkClick(e, t, n, r, a, qe(o), i);
                              });
                            }),
                            (O.trackAdImpression = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c,
                              s,
                              u
                            ) {
                              et(function () {
                                C.trackAdImpression(
                                  e,
                                  t,
                                  n,
                                  r,
                                  a,
                                  o,
                                  i,
                                  c,
                                  qe(s),
                                  u
                                );
                              });
                            }),
                            (O.trackAdClick = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c,
                              s,
                              u,
                              l
                            ) {
                              et(function () {
                                C.trackAdClick(
                                  e,
                                  t,
                                  n,
                                  r,
                                  a,
                                  o,
                                  i,
                                  c,
                                  s,
                                  qe(u),
                                  l
                                );
                              });
                            }),
                            (O.trackAdConversion = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c,
                              s,
                              u,
                              l
                            ) {
                              et(function () {
                                C.trackAdConversion(
                                  e,
                                  t,
                                  n,
                                  r,
                                  a,
                                  o,
                                  i,
                                  c,
                                  s,
                                  qe(u),
                                  l
                                );
                              });
                            }),
                            (O.trackSocialInteraction = function (
                              e,
                              t,
                              n,
                              r,
                              a
                            ) {
                              et(function () {
                                C.trackSocialInteraction(e, t, n, qe(r), a);
                              });
                            }),
                            (O.trackAddToCart = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c
                            ) {
                              et(function () {
                                C.trackAddToCart(e, t, n, r, a, o, qe(i), c);
                              });
                            }),
                            (O.trackRemoveFromCart = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c
                            ) {
                              et(function () {
                                C.trackRemoveFromCart(
                                  e,
                                  t,
                                  n,
                                  r,
                                  a,
                                  o,
                                  qe(i),
                                  c
                                );
                              });
                            }),
                            (O.trackSiteSearch = function (e, t, n, r, a, o) {
                              et(function () {
                                C.trackSiteSearch(e, t, n, r, qe(a), o);
                              });
                            }),
                            (O.trackTiming = function (e, t, n, r, a, o) {
                              et(function () {
                                C.trackSelfDescribingEvent(
                                  {
                                    schema:
                                      "iglu:com.snowplowanalytics.snowplow/timing/jsonschema/1-0-0",
                                    data: {
                                      category: e,
                                      variable: t,
                                      timing: n,
                                      label: r,
                                    },
                                  },
                                  qe(a),
                                  o
                                );
                              });
                            }),
                            (O.trackConsentWithdrawn = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i
                            ) {
                              et(function () {
                                C.trackConsentWithdrawn(
                                  e,
                                  t,
                                  n,
                                  r,
                                  a,
                                  qe(o),
                                  i
                                );
                              });
                            }),
                            (O.trackConsentGranted = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i
                            ) {
                              et(function () {
                                C.trackConsentGranted(e, t, n, r, a, qe(o), i);
                              });
                            }),
                            (O.trackEnhancedEcommerceAction = function (
                              e,
                              t,
                              n
                            ) {
                              var r = _e.concat(t || []);
                              (_e.length = 0),
                                et(function () {
                                  C.trackSelfDescribingEvent(
                                    {
                                      schema:
                                        "iglu:com.google.analytics.enhanced-ecommerce/action/jsonschema/1-0-0",
                                      data: { action: e },
                                    },
                                    qe(r),
                                    n
                                  );
                                });
                            }),
                            (O.addEnhancedEcommerceActionContext = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c,
                              s,
                              u
                            ) {
                              _e.push({
                                schema:
                                  "iglu:com.google.analytics.enhanced-ecommerce/actionFieldObject/jsonschema/1-0-0",
                                data: {
                                  id: e,
                                  affiliation: t,
                                  revenue: it.parseFloat(n),
                                  tax: it.parseFloat(r),
                                  shipping: it.parseFloat(a),
                                  coupon: o,
                                  list: i,
                                  step: it.parseInt(c),
                                  option: s,
                                  currency: u,
                                },
                              });
                            }),
                            (O.addEnhancedEcommerceImpressionContext =
                              function (e, t, n, r, a, o, i, c, s) {
                                _e.push({
                                  schema:
                                    "iglu:com.google.analytics.enhanced-ecommerce/impressionFieldObject/jsonschema/1-0-0",
                                  data: {
                                    id: e,
                                    name: t,
                                    list: n,
                                    brand: r,
                                    category: a,
                                    variant: o,
                                    position: it.parseInt(i),
                                    price: it.parseFloat(c),
                                    currency: s,
                                  },
                                });
                              }),
                            (O.addEnhancedEcommerceProductContext = function (
                              e,
                              t,
                              n,
                              r,
                              a,
                              o,
                              i,
                              c,
                              s,
                              u,
                              l
                            ) {
                              _e.push({
                                schema:
                                  "iglu:com.google.analytics.enhanced-ecommerce/productFieldObject/jsonschema/1-0-0",
                                data: {
                                  id: e,
                                  name: t,
                                  list: n,
                                  brand: r,
                                  category: a,
                                  variant: o,
                                  price: it.parseFloat(i),
                                  quantity: it.parseInt(c),
                                  coupon: s,
                                  position: it.parseInt(u),
                                  currency: l,
                                },
                              });
                            }),
                            (O.addEnhancedEcommercePromoContext = function (
                              e,
                              t,
                              n,
                              r,
                              a
                            ) {
                              _e.push({
                                schema:
                                  "iglu:com.google.analytics.enhanced-ecommerce/promoFieldObject/jsonschema/1-0-0",
                                data: {
                                  id: e,
                                  name: t,
                                  creative: n,
                                  position: r,
                                  currency: a,
                                },
                              });
                            }),
                            (O.enableGdprContext = function (e) {
                              var t =
                                  1 < arguments.length &&
                                  void 0 !== arguments[1]
                                    ? arguments[1]
                                    : null,
                                n =
                                  2 < arguments.length &&
                                  void 0 !== arguments[2]
                                    ? arguments[2]
                                    : null,
                                r =
                                  3 < arguments.length &&
                                  void 0 !== arguments[3]
                                    ? arguments[3]
                                    : null,
                                a = S[e];
                              a
                                ? ((ge.gdprBasis = !0),
                                  (Ae = {
                                    gdprBasis: a,
                                    gdprDocId: t,
                                    gdprDocVer: n,
                                    gdprDocDesc: r,
                                  }))
                                : it.warn(
                                    "enableGdprContext failed. basisForProcessing must be set to one of: consent, legalObligation, vitalInterests publicTask, legitimateInterests"
                                  );
                            }),
                            (O.addGlobalContexts = function (e) {
                              C.addGlobalContexts(e);
                            }),
                            (O.removeGlobalContexts = function (e) {
                              C.removeGlobalContexts(e);
                            }),
                            (O.clearGlobalContexts = function () {
                              C.clearGlobalContexts();
                            }),
                            (O.enableErrorTracking = function (e, t) {
                              me.enableErrorTracking(e, t, qe());
                            }),
                            (O.trackError = function (e, t, n, r, a, o) {
                              var i = qe(o);
                              me.trackError(e, t, n, r, a, i);
                            }),
                            (O.preservePageViewId = function () {
                              be = !0;
                            }),
                            (O.setDebug = function (e) {
                              (j = Boolean(e).valueOf()), tt();
                            }),
                            (T = vt(O)),
                            tt(),
                            P
                          );
                        };
                      })();
                    },
                    {
                      "./errors": 165,
                      "./forms": 166,
                      "./guard": 167,
                      "./lib/detectors": 170,
                      "./lib/helpers": 171,
                      "./lib/proxies": 172,
                      "./links": 173,
                      "./out_queue": 174,
                      "lodash/forEach": 122,
                      "lodash/map": 142,
                      sha1: 152,
                      "snowplow-tracker-core": 153,
                      uuid: 160,
                    },
                  ],
                },
                {},
                [169]
              );
              /* tracking */
            }

            var collector = "gt.andata.ru";
            window.globalid("newTracker", "cf", collector, {
              appId: params.app_id,
              platform: "web",
              contexts: {
                webPage: true,
                performanceTiming: true,
                gaCookies: true,
              },
            });
            //window.globalid('disableActivityTracking');
            window.globalid("enableLinkClickTracking");
            window.globalid(
              "enableFormTracking",
              null,
              AndataTracking.getContext()
            );
            window.globalid("trackPageView", null, AndataTracking.getContext());
            document.cookie = "_ubtcuid=" + AndataTracking.ubtcuid + "; path=/";
            (function () {
              j = document.createElement("script");
              j.async = true;
              j.src = "https://lk.andata.ru/tag-manager/" + params.app_id;
              j2 = document.getElementsByTagName("script")[0];
              j2.parentNode.insertBefore(j, j2);
            })();
            if (document.readyState === "loading") {
              document.addEventListener(
                "DOMContentLoaded",
                handlerButtonsEvents
              );
            } else {
              handlerButtonsEvents();
            }

            function handlerButtonsEvents() {
              var body = document.querySelector("body");
              body.addEventListener(
                "click",
                function (e) {
                  if (!e.target.hasAttribute("data-andata-id")) return false;
                  var xhr = new XMLHttpRequest();
                  xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                      console.log(this.responseText);
                    }
                  });
                  var api_key = "0";
                  var event_name = "click_element_event";
                  var event_source = location.host;
                  var d = {
                    button_id: e.target.getAttribute("data-andata-id"),
                    button_text: e.target.textContent.trim(),
                    tagname: e.target.tagName,
                    url: location.href,
                  };
                  xhr.open(
                    "GET",
                    "https://" +
                      params.mdeploy_host +
                      "/api.php?apikey=" +
                      api_key +
                      "&event_name=" +
                      event_name +
                      "&event_source=" +
                      event_source +
                      "&event_ubtcuid=" +
                      window.ubtcuid +
                      "&event_data=" +
                      JSON.stringify(d)
                  );
                  xhr.send();
                },
                true
              );
            }
          } else {
            console.log("Attempt to reinitialize Andata Tracking");
          }
        };
      },
      andataEvent(params) {
        return (context = null) => {
          function escapeEventName(name) {
            return name.replaceAll(" ", "_");
          }
          log(
            "andataEvent------------------------------------------------------------------"
          );
          log("andataEvent CONTEXT:::", context);
          // Создаем переменную с названием события
          if (typeof context == "object" && context !== null) {
            context["eventName"] = escapeEventName(
              params.event_name.toString()
            );
          }
          let query = applyAndataTMJoin(params, context);

          log("andataEvent event_name before transform:::", query.event_name);
          //log("andataEvent sales_tunnel_level:::", params.sales_tunnel_level.toString());
          query.event_name = escapeEventName(query.event_name);
          log("andataEvent event_name after transform:::", query.event_name);
          log("andataEvent query:::", query);
          log("andataEvent query event_data:::: ", query.event_data);

          let queryData = { ...query };
          log("andataEvent queryData:::", queryData);
          log(
            "andataEvent query conversion:::",
            queryData.conversion === "true"
          );
          // data.event_data = params.event_data
          delete queryData.sent_to_ym;
          delete queryData.sent_to_ga;
          delete queryData.json_schema;
          delete queryData.atm_json_schema;

          // Generate events with name of andataEvent for all registered State Machines
          new AndataSMCreateEvents().run(queryData.event_name);

          if (
            "ym" in window &&
            query.hasOwnProperty("sent_to_ym") &&
            query.hasOwnProperty("sent_to_ym_target") &&
            query["sent_to_ym"]
          ) {
            const goals = query.sent_to_ym_target.split(",");
            goals.forEach((goal) => {
              try {
                const counter = goal.split("_")[0];
                console.log("andataEvent counter:::", counter);
                ym(counter, "reachGoal", queryData.event_name, queryData);
              } catch (e) {}
            });
          }
          if (query.hasOwnProperty("sent_to_ga") && query["sent_to_ga"]) {
            const eventCategory = "andata";
            const eventAction = queryData.event_name;
            const eventLabel = "andataEvent";
            const eventValue = 1;
            ga(function (tracker) {
              var clientId = tracker.get("clientId");
              const url = `https://www.google-analytics.com/collect?v=1&t=event&tid=${query["sent_to_ga"]}&cid=${clientId}&ec=${eventCategory}&ea=load&el=${eventLabel}&ev=${eventValue}`;
              fetch(url, { method: "POST", body: JSON.stringify(queryData) });
            });

            ga(
              "send",
              "event",
              eventCategory,
              eventAction,
              eventLabel,
              eventValue,
              queryData
            );
          }
          //query["event_data"] = {};
          log("andataEvent validation start --------");
          const validator = new AndataTypeValidator();
          const exclude_passport = Array();
          const exclude_analytic = Array();
          //for (let key in params.event_data) {
          for (let key in queryData.event_data) {
            if (!queryData.event_data.hasOwnProperty(key)) continue;
            const data = queryData.event_data[key].value;
            if (!data) continue;
            let type =
              data && data.hasOwnProperty("type")
                ? data.type.toString()
                : "string";
            log(
              "andataEvent value:::",
              "KEY:",
              key,
              "DATA:",
              data,
              "queryData.event_data[key]:",
              queryData.event_data[key]
            );
            let value = "";
            try {
              const disable_passport = data?.passport === "true";
              const disable_analytic = data?.analytic === "true";
              log("andataEvent is_passport:::", key, disable_passport);
              if (disable_passport) {
                exclude_passport.push(key);
              }
              if (disable_analytic) {
                exclude_analytic.push(key);
              }
            } catch (e) {
              log("andataEvent error:", e.message);
            }
            log(
              "andataEvent data.value:::",
              key,
              "type = " + data.type,
              typeof data.value,
              "value = ",
              data.value
            );
            if (data.value !== null && data.value !== void 0) {
              value = data.value.toString();
            } else {
              value = "";
            }

            if (type === "array") {
              try {
                if (Array.isArray(data.value)) {
                  value = data.value;
                } else {
                  if (typeof data.value === "string") {
                    value = JSON.parse(data.value);
                  } else if (data.value.hasOwnProperty("extractNotEmpty")) {
                    console.log(
                      "ARRAY ::: ",
                      "type:",
                      typeof data.value,
                      "value:",
                      data.value
                    );
                    value = JSON.parse(data.value.extractNotEmpty().value());
                  }
                }
              } catch (e) {
                log("Variable ", key, e.message);
                value = [];
              }
              log("data.value!", key, data.constructor.name, value);
            }
            if (type === "object") {
              if (typeof data.value !== "object") {
                value = JSON.parse(data.value);
              } else {
                if ("extractNotEmpty" in data.value) {
                  value = data.value.extractNotEmpty().value();
                } else {
                  value = data.value;
                }
              }
            }
            let required = data.hasOwnProperty("required")
              ? data.required.toString() === "true"
              : false;
            try {
              log(
                "andataEvent validate: ",
                key,
                "type:",
                type,
                "value: ",
                value
              );
              let typedValue = validator.check(key, type, value, required);
              log(
                "andataEvent validate: ",
                key,
                "type:",
                type,
                "value: ",
                value,
                "typed:",
                typedValue,
                typeof value
              );
              query[key] = typedValue;
            } catch (e) {
              console.error(
                "Invalid validation for " + key,
                e.message,
                e.stack
              );
            }
          }
          log("andataEvent validation end --------");
          const json_schema = query["json_schema"];
          log("andataEvent query:::: ", query);
          log("andataEvent passport:::: ", exclude_passport);
          delete query.sent_to_ym;
          delete query.sent_to_ga;
          delete query.json_schema;
          delete query.event_data;
          delete query.atm_json_schema;
          delete query.conversion;
          delete query.sales_tunnel;
          delete query.sales_tunnel_level;
          delete query.tag_id;
          delete query.tag_name;
          delete query.adv_id;
          delete query.conversion_currency;
          delete query.conversion_amount;
          delete query.sent_to_ym_backend;
          delete query.sent_to_ym_target;

          query["event_ubtcuid"] = tagManager.vars["var_ubtcuid"].toString();
          query["event_source"] = "tagmanager";
          query["event_datetime"] =
            tagManager.vars["var_currentDateTime"].toString();

          const stack = new AndataStack("andataEvent", 20);
          const banners_history = stack.get();

          const tunnels = [];
          /*Array.isArray(params.sales_tunnel_level) && params.sales_tunnel_level.forEach(it => {
        tunnels.push({
            level_id: it.level_id.toString(context),
            level_name: it.level_name.toString(context),
            tunnel_id: it.tunnel_id.toString(context),
            tunnel_name: it.tunnel_name.toString(context),
        });
    })*/

          log("andataEvent tunnels:::", tunnels);

          // const ya_targets = [];
          // Array.isArray(params.sent_to_ym_target) && params.sent_to_ym_target.forEach(it => {
          //     let parts = it.toString(context).split("_");
          //     console.log("andataEvent parts:::", parts);
          //
          //     parts.length===2 && ya_targets.push({
          //         counter: parts[0] ?? 'undefined',
          //         target: parts[1] ?? 'undefined',
          //     });
          // })

          // Сохраняем имя события в объекте meta контекста запроса
          const meta = {
            event_name: query.event_name,
            banners_history,
            exclude_passport,
            exclude_analytic,
            tunnels,
            // adv_id: queryData.adv_id ?? 'undefined',
            // conversion_currency: queryData.conversion_currency ?? 'undefined',
            // conversion_price: queryData.conversion_price ?? 'undefined',
            // sent_to_ym_backend: queryData.sent_to_ym_backend ?? false,
            // ya_targets
          };
          /* Сохраняем данные из andataEvent в Storage без самой истории, чтобы избежать рекурсии */
          // Сохраняем только клики по баннерам
          if (query.event_name === "clickbannerevent") {
            stack.push({
              event_name: query.event_name,
              banner_id: query.bannerID ?? null,
              banner_title: query.banner_title ?? null,
              banner_group_id: query.banner_group_id ?? null,
            });
          }

          log("andataEvent Snowplow context: ", {
            container_id: "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
            container_version: "11",
            atm_version: "unknown",
            instance: "tagmanager.andata.ru",
            meta: meta,
          });
          if (window.globalid) {
            window.globalid(function () {
              if (this.cf?.addPlugin) {
                // v3
                console.log("andataEvent Snowplow v3");
                window.globalid("trackSelfDescribingEvent", {
                  event: {
                    schema: json_schema,
                    data: query,
                  },
                  context: [
                    {
                      schema:
                        "iglu:ru-andata/andata-event-custom-context/jsonschema/1-0-0",
                      data: {
                        container_id: "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
                        container_version: "11",
                        tag_id: queryData.tag_id,
                        tag_name: queryData.tag_name,
                        atm_version: "unknown",
                        instance: "tagmanager.andata.ru",
                        meta: meta,
                      },
                    },
                  ],
                });
              } else {
                // v2
                console.log("andataEvent Snowplow v2");
                window.globalid(
                  "trackSelfDescribingEvent",
                  {
                    schema: json_schema,
                    data: query,
                  },
                  [
                    {
                      schema:
                        "iglu:ru-andata/andata-event-custom-context/jsonschema/1-0-0",
                      data: {
                        container_id: "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
                        container_version: "11",
                        tag_id: queryData.tag_id,
                        tag_name: queryData.tag_name,
                        atm_version: "unknown",
                        instance: "tagmanager.andata.ru",
                        meta: meta,
                      },
                    },
                  ]
                );
              }
            });
          } else {
            log("andataEvent Snowplow not found");
            log("XMLHttpRequest:::", XMLHttpRequest);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://mdeploy.andata.ru/api2.php", true);
            xhr.setRequestHeader("Content-type", "application/json");
            //xhr.getResponseHeader("Content-type", "application/json");

            xhr.onload = function () {
              try {
                const obj = JSON.parse(this.responseText);
                log("andataEvent Response: ", obj);
              } catch (e) {
                log(e.message);
              }
            };
            xhr.send(JSON.stringify({ query, meta, context }));
          }
          log(
            "andataEvent=================================================================="
          );
        };
      },
      customHTML(params) {
        return (context = null) => {
          //console.log("customHTML context:", context, params.html.toString());
          let html = params.html.toString(context);
          let target = "body";
          if (params.target) {
            target = params.target.toString(context);
          }
          log("params.target", target, !target);
          if (!target) {
            target = "body";
          }
          document.querySelectorAll(target).forEach((item) => {
            let div = document.createElement("div");
            item.appendChild(
              document.createRange().createContextualFragment(html)
            );
            //log("html:::", item.outerHTML);
          });
        };
      },
    };
    this.tagTypes = tagTypes;
    /* triggerTypes */
    const triggerTypes = {
      ATMLoad(params) {
        return (callable) => {
          try {
            callable();
          } catch (e) {
            console.error(e.message);
          }
        };
      },
      click(params) {
        return (callable) => {
          document.addEventListener("click", function (e) {
            try {
              let found,
                el = e.target || e.srcElement;
              while (el && !(found = el.matches(params.selector ?? "body")))
                el = el.parentElement;
              if (found) {
                log("Click found ", el);
                let context = {};
                try {
                  context = Object.assign({}, el.dataset);
                  log("CONTEXT START::::->", context);

                  Object.keys(context).forEach(function (key, index) {
                    try {
                      context[key] = JSON.parse(context[key]);
                    } catch (e) {
                      log("Context JSON parse error: ", e.message, context);
                    }
                  });

                  log("CONTEXT END::::->", context);
                } catch (e) {}
                callable = AndataTMEventDecorator(
                  callable,
                  el,
                  params,
                  context
                );
                callable(e);
              }
            } catch (e) {
              console.error(e.message);
            }
          });
        };
      },
      submitForm(params) {
        return (callable) => {
          document.addEventListener("submit", function (e) {
            //e.preventDefault();
            log("submitForm:::", e);
            try {
              log("trigger submit ran", params.selector, e.target);
              let found,
                el = e.target;
              while (el && !(found = el.matches(params.selector ?? "body")))
                el = el.parentElement;
              if (found) {
                log("Form found ", el);
                let context = {};
                try {
                  const formData = new FormData(el);
                  formData.forEach(
                    (value, key) => (context[key] = JSON.parse(value))
                  );
                } catch (err) {
                  log(err.message);
                }
                callable = AndataTMEventDecorator(
                  callable,
                  el,
                  params,
                  context
                );
                callable(e);
                //window.setTimeout(() =>{ el.submit(); }, 600);
              }
            } catch (e) {
              console.error(e.message);
            }
          });
        };
      },
      pageView(params) {
        return (callable) => {
          if (params.pageURL) {
            const queryString = window.location.href;
            let matches = true;
            if (
              params.regexp &&
              queryString.search(new RegExp(params.pageURL)) == -1
            ) {
              log("Trigger pageView not regexp");
              return;
            } else if (params.strict && queryString !== params.pageURL) {
              log("Trigger pageView not strict");
              return;
            } else if (
              !params.strict &&
              !params.regexp &&
              !queryString.startsWith(params.pageURL)
            ) {
              log("Trigger pageView not starts");
              return;
            }
          }
          callable = AndataTMEventDecorator(
            callable,
            document.body,
            params,
            null
          );
          if (document.readyState !== "loaded") {
            setTimeout(callable, parseInt(params.delay) ?? 0);
          } else {
            document.addEventListener("DOMContentLoaded", () => {
              setTimeout(callable, parseInt(params.delay) ?? 0);
            });
          }
          new AndataTMLocationObserver(params.delay, callable);
        };
      },
      mousedown(params) {
        return (callable) => {
          document.addEventListener("mousedown", function (e) {
            let found,
              el = e.target || e.srcElement;
            while (el && !(found = el.matches(params.selector ?? "body")))
              el = el.parentElement;
            if (found) {
              log("mousedown found ", el);
              let context = {};
              try {
                context = Object.assign({}, el.dataset);
                log("CONTEXT::::->", context);
              } catch (e) {}
              callable = AndataTMEventDecorator(callable, el, params, context);
              callable(e);
            }
          });
        };
      },
    };

    /* Variables */
    tagManager.vars["var_9bac1437_3431_4a02_91d0_1ed2da557b6a"] =
      new inputValueVariableObject(
        "input_email_popup",
        new tagManager.AndataFunc(() => {
          return {
            selector: new tagManager.AndataTMJoin([
              'div.popup_is-active input[placeholder="Email"]',
            ]),
          };
        })
      );
    tagManager.varsNamespace["input_email_popup"] =
      "var_9bac1437_3431_4a02_91d0_1ed2da557b6a";
    tagManager.vars["var_9bac395a_3400_47db_8de9_be868a2d2d27"] =
      new inputValueVariableObject(
        "input_phone_form7",
        new tagManager.AndataFunc(() => {
          return {
            selector: new tagManager.AndataTMJoin([
              'form[name="SIMPLE_FORM_7"] input.input_phone',
            ]),
          };
        })
      );
    tagManager.varsNamespace["input_phone_form7"] =
      "var_9bac395a_3400_47db_8de9_be868a2d2d27";
    tagManager.vars["var_9bac3f4c_7148_4908_9a7f_856acb550aa5"] =
      new inputValueVariableObject(
        "input_phone_feedback",
        new tagManager.AndataFunc(() => {
          return {
            selector: new tagManager.AndataTMJoin([
              'form[name="SIMPLE_FORM_5"] input.input_phone',
            ]),
          };
        })
      );
    tagManager.varsNamespace["input_phone_feedback"] =
      "var_9bac3f4c_7148_4908_9a7f_856acb550aa5";
    tagManager.vars["var_9bac3f75_4b1d_46b1_9bfb_0c9b770a5d30"] =
      new inputValueVariableObject(
        "input_email_feedback",
        new tagManager.AndataFunc(() => {
          return {
            selector: new tagManager.AndataTMJoin([
              'form[name="SIMPLE_FORM_5"] input.input_email',
            ]),
          };
        })
      );
    tagManager.varsNamespace["input_email_feedback"] =
      "var_9bac3f75_4b1d_46b1_9bfb_0c9b770a5d30";
    tagManager.vars["var_9bac1181_94b7_4082_bca3_6d836969d03d"] =
      new inputValueVariableObject(
        "form_id",
        new tagManager.AndataFunc(() => {
          return {
            selector: new tagManager.AndataTMJoin([
              'input[name="WEB_FORM_ID"]',
            ]),
          };
        })
      );
    tagManager.varsNamespace["form_id"] =
      "var_9bac1181_94b7_4082_bca3_6d836969d03d";
    tagManager.vars["var_9bac0e1e_0e63_417d_ae7a_324408e86a1f"] =
      new customVariableObject(
        "input_phone_contacts",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document
                  .querySelector("form[name=SIMPLE_FORM_4] input.input_phone")
                  .value.replace(/\D/gi, "");
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_phone_contacts"] =
      "var_9bac0e1e_0e63_417d_ae7a_324408e86a1f";
    tagManager.vars["var_9bac0f2d_9e1f_4fa2_8037_72edf251647f"] =
      new customVariableObject(
        "input_email_contacts",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document.querySelector(
                  "form[name=SIMPLE_FORM_4] input[name=form_text_30]"
                ).value;
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_email_contacts"] =
      "var_9bac0f2d_9e1f_4fa2_8037_72edf251647f";
    tagManager.vars["var_9bac1222_f10b_4256_b7cf_3094196af843"] =
      new inputValueVariableObject(
        "input_phone_popup",
        new tagManager.AndataFunc(() => {
          return {
            selector: new tagManager.AndataTMJoin([
              "div.popup_is-active input.input_phone",
            ]),
          };
        })
      );
    tagManager.varsNamespace["input_phone_popup"] =
      "var_9bac1222_f10b_4256_b7cf_3094196af843";
    tagManager.vars["var_9bd2c3f0_5576_4517_8459_df1fc7cba380"] =
      new customVariableObject(
        "input_phone_promo",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document
                  .querySelector(
                    "body.promo_page form.activated-form-promo input#phone1"
                  )
                  .value.replace(/\D/gi, "");
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_phone_promo"] =
      "var_9bd2c3f0_5576_4517_8459_df1fc7cba380";
    tagManager.vars["var_9bd2c59b_21b0_428d_b454_d1155267f17a"] =
      new customVariableObject(
        "input_address_promo",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document.querySelector(
                  "body.promo_page form.activated-form-promo #adr11"
                ).value;
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_address_promo"] =
      "var_9bd2c59b_21b0_428d_b454_d1155267f17a";
    tagManager.vars["var_9bd2c980_25c4_42c1_9048_e04eba73d681"] =
      new customVariableObject(
        "input_phone_top",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document
                  .querySelector(
                    "body.top_page form.activated-form-top input#phone1"
                  )
                  .value.replace(/\D/gi, "");
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_phone_top"] =
      "var_9bd2c980_25c4_42c1_9048_e04eba73d681";
    tagManager.vars["var_9bd2c9b8_dc54_4960_be47_0b088d90d8a7"] =
      new customVariableObject(
        "input_address_top",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document.querySelector(
                  "body.top_page form.activated-form-top #adr11"
                ).value;
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_address_top"] =
      "var_9bd2c9b8_dc54_4960_be47_0b088d90d8a7";
    tagManager.vars["var_9bd2cd59_1248_4a39_aa86_15b00783ae83"] =
      new customVariableObject(
        "tariff_name_promo",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document.querySelector(
                  "body.promo_page #tarifs__section > div.checkout.checkout-active > div > div > span:nth-child(1)"
                ).textContent;
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["tariff_name_promo"] =
      "var_9bd2cd59_1248_4a39_aa86_15b00783ae83";
    tagManager.vars["var_9bd2cd8c_3e88_4f5f_b94b_9e5efe4050ef"] =
      new customVariableObject(
        "tariff_name_top",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document.querySelector(
                  "body.top_page #tarifs__section > div.checkout.checkout-active > div > div > span:nth-child(1)"
                ).textContent;
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["tariff_name_top"] =
      "var_9bd2cd8c_3e88_4f5f_b94b_9e5efe4050ef";
    tagManager.vars["var_9bd2d31c_c915_4247_87ef_d7ded784d5c0"] =
      new customVariableObject(
        "input_phone_hr",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document
                  .querySelector("body.hr_page form #phone")
                  .value.replace(/\D/gi, "");
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_phone_hr"] =
      "var_9bd2d31c_c915_4247_87ef_d7ded784d5c0";
    tagManager.vars["var_9bd2d464_b17f_4318_9418_369bd831a7bf"] =
      new customVariableObject(
        "input_email_hr",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document.querySelector("body.hr_page form #email").value;
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_email_hr"] =
      "var_9bd2d464_b17f_4318_9418_369bd831a7bf";
    tagManager.vars["var_9bd2d53f_4eb7_445f_aaa6_6bf9dc0cf422"] =
      new customVariableObject(
        "input_vacancy_hr",
        new tagManager.AndataFunc(() => {
          return {
            callable: () => {
              try {
                return document.querySelector(
                  "body.hr_page form button span#select-label"
                ).textContent;
              } catch (e) {
                return "unknown";
              }
            },
            persistent: false,
          };
        })
      );
    tagManager.varsNamespace["input_vacancy_hr"] =
      "var_9bd2d53f_4eb7_445f_aaa6_6bf9dc0cf422";

    /* Tags */
    const tag_dummy = tagTypes.dummy(null);
    const tag_9b91d138_9933_4d02_9553_60f1dd7cbc44 = dependencyGuard.apply(
      "tag_9b91d138_9933_4d02_9553_60f1dd7cbc44",
      tagTypes.AndataTracking({
        app_id: new tagManager.AndataTMJoin(["ekotelekom_zisej"]),
        mdeploy_host: new tagManager.AndataTMJoin(["mdeploy.andata.ru"]),
        tag_id: new tagManager.AndataTMJoin([
          "9b91d138-9933-4d02-9553-60f1dd7cbc44",
        ]),
        tag_name: new tagManager.AndataTMJoin(["andataTracking"]),
      })
    );
    const tag_9bac25a7_3110_4f65_8528_aefe6ffaff01 = dependencyGuard.apply(
      "tag_9bac25a7_3110_4f65_8528_aefe6ffaff01",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_tel_support"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167587"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac25a7-3110-4f65-8528-aefe6ffaff01",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430",
        ]),
      })
    );
    const tag_9bac25d6_e8d5_450a_92ab_8175239a3853 = dependencyGuard.apply(
      "tag_9bac25d6_e8d5_450a_92ab_8175239a3853",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_tg"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167592"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac25d6-e8d5-450a-92ab-8175239a3853",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e telegram",
        ]),
      })
    );
    const tag_9bac261c_cbb2_4f9d_8837_5fdac200ee4c = dependencyGuard.apply(
      "tag_9bac261c_cbb2_4f9d_8837_5fdac200ee4c",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_vk"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167596"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac261c-cbb2-4f9d-8837-5fdac200ee4c",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u0412\u041a",
        ]),
      })
    );
    const tag_9bac2649_ce3e_4f62_baf3_75b6e7e5e40d = dependencyGuard.apply(
      "tag_9bac2649_ce3e_4f62_baf3_75b6e7e5e40d",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_akcii"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167632"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac2649-ce3e-4f62-baf3-75b6e7e5e40d",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u0410\u043a\u0446\u0438\u0438",
        ]),
      })
    );
    const tag_9bac26e3_5329_4364_8ad3_1017cef17220 = dependencyGuard.apply(
      "tag_9bac26e3_5329_4364_8ad3_1017cef17220",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_btn_connect"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167650"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac26e3-5329-4364-8ad3-1017cef17220",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f",
        ]),
      })
    );
    const tag_9bac3459_0da7_4dc3_9926_ea76173f9740 = dependencyGuard.apply(
      "tag_9bac3459_0da7_4dc3_9926_ea76173f9740",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_check_address"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167669"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac3459-0da7-4dc3-9926-ea76173f9740",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c \u0430\u0434\u0440\u0435\u0441",
        ]),
      })
    );
    const tag_9bac3497_616b_4c08_a65c_ab22b94dde1a = dependencyGuard.apply(
      "tag_9bac3497_616b_4c08_a65c_ab22b94dde1a",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_tariff_offer"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167677"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac3497-616b-4c08-a65c-ab22b94dde1a",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u0442\u0430\u0440\u0438\u0444\u043d\u043e\u043c\u0443 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044e",
        ]),
      })
    );
    const tag_9bac3526_0b5e_4fa9_9e98_2cbd10d621a4 = dependencyGuard.apply(
      "tag_9bac3526_0b5e_4fa9_9e98_2cbd10d621a4",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_choose_tariff"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167672"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac3526-0b5e-4fa9-9e98-2cbd10d621a4",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0430\u0440\u0438\u0444",
        ]),
      })
    );
    const tag_9bac360f_d6fd_482a_a180_ef1643e84164 = dependencyGuard.apply(
      "tag_9bac360f_d6fd_482a_a180_ef1643e84164",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_lk"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167685"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac360f-d6fd-482a-a180-ef1643e84164",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u0435\u0440\u0435\u0445\u043e\u0434 \u0432 \u041b\u041a",
        ]),
      })
    );
    const tag_9bac3798_7aeb_4cf5_aa8d_3faee92bbe9f = dependencyGuard.apply(
      "tag_9bac3798_7aeb_4cf5_aa8d_3faee92bbe9f",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["send_form_application"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          form_id: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1181_94b7_4082_bca3_6d836969d03d,
              ]),
              passport: false,
              conversion_amount: false,
              conversion_currency: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac395a_3400_47db_8de9_be868a2d2d27,
              ]),
              passport: false,
              conversion_amount: false,
              conversion_currency: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac3798-7aeb-4cf5-aa8d-3faee92bbe9f",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 (7)",
        ]),
      })
    );
    const tag_9bac3b8a_0898_424a_aa60_a87ba98c6ac2 = dependencyGuard.apply(
      "tag_9bac3b8a_0898_424a_aa60_a87ba98c6ac2",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["send_form_popup"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          form_id: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1181_94b7_4082_bca3_6d836969d03d,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_email: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1437_3431_4a02_91d0_1ed2da557b6a,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1222_f10b_4256_b7cf_3094196af843,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac3b8a-0898-424a-aa60-a87ba98c6ac2",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0438 \u043d\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 (popup)",
        ]),
      })
    );
    const tag_9bac3d20_ab50_4503_850d_0b4872e52cf4 = dependencyGuard.apply(
      "tag_9bac3d20_ab50_4503_850d_0b4872e52cf4",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["send_form_contacts"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          form_id: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1181_94b7_4082_bca3_6d836969d03d,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac0e1e_0e63_417d_ae7a_324408e86a1f,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_email: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac0f2d_9e1f_4fa2_8037_72edf251647f,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac3d20-ab50-4503-850d-0b4872e52cf4",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b (4)",
        ]),
      })
    );
    const tag_9bac3de0_2f90_491c_b759_969b46ef5b65 = dependencyGuard.apply(
      "tag_9bac3de0_2f90_491c_b759_969b46ef5b65",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["send_form_zakaz_obor"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          form_id: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1181_94b7_4082_bca3_6d836969d03d,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1222_f10b_4256_b7cf_3094196af843,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_email: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1437_3431_4a02_91d0_1ed2da557b6a,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac3de0-2f90-491c-b759-969b46ef5b65",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b popup \u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435 (6)",
        ]),
      })
    );
    const tag_9bac4058_f3c8_4f5c_bbb3_dfe9fb9a4e3f = dependencyGuard.apply(
      "tag_9bac4058_f3c8_4f5c_bbb3_dfe9fb9a4e3f",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["send_form_feedback"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          form_id: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac1181_94b7_4082_bca3_6d836969d03d,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac3f4c_7148_4908_9a7f_856acb550aa5,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_email: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bac3f75_4b1d_46b1_9bfb_0c9b770a5d30,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac4058-f3c8-4f5c-bbb3-dfe9fb9a4e3f",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u041e\u0431\u0440\u0430\u0442\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c (5)",
        ]),
      })
    );
    const tag_9bac41ab_3bca_43e2_be8b_076e95973983 = dependencyGuard.apply(
      "tag_9bac41ab_3bca_43e2_be8b_076e95973983",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["send_forms"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: [],
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167695"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac41ab-3bca-43e2-be8b-076e95973983",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u043b\u044e\u0431\u043e\u0439 \u0444\u043e\u0440\u043c\u044b",
        ]),
      })
    );
    const tag_9bac5cfb_cd45_4140_ad52_1808034d1f9f = dependencyGuard.apply(
      "tag_9bac5cfb_cd45_4140_ad52_1808034d1f9f",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_oborudovanie"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167687"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac5cfb-cd45-4140-ad52-1808034d1f9f",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435",
        ]),
      })
    );
    const tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3 = dependencyGuard.apply(
      "tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["micro_conversions"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167544"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac5d66-70ae-4039-ab86-6f95676d8ec3",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041c\u0438\u043a\u0440\u043e\u043a\u043e\u043d\u0432\u0435\u0440\u0441\u0438\u0438 \u0434\u043b\u044f \u042f\u043d\u0434\u0435\u043a\u0441 \u041c\u0435\u0442\u0440\u0438\u043a\u0438",
        ]),
      })
    );
    const tag_9bac5f7c_2491_4670_9878_17e3c69bc4dd = dependencyGuard.apply(
      "tag_9bac5f7c_2491_4670_9878_17e3c69bc4dd",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_pay"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: [],
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328167689"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bac5f7c-2491-4670-9878-17e3c69bc4dd",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c",
        ]),
      })
    );
    const tag_9badae69_9bfd_47e7_8c50_760664326c97 = dependencyGuard.apply(
      "tag_9badae69_9bfd_47e7_8c50_760664326c97",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["click_tel_connect"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: [],
        conversion: true,
        adv_id: null,
        sent_to_ym: 2446,
        sent_to_ym_backend: null,
        sent_to_ym_target: [
          new tagManager.AndataTMJoin(["27260183_328208289"]),
        ],
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9badae69-9bfd-47e7-8c50-760664326c97",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c",
        ]),
      })
    );
    const tag_9bca53af_fdde_443a_99b5_f6856ea259e3 = dependencyGuard.apply(
      "tag_9bca53af_fdde_443a_99b5_f6856ea259e3",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["page_block"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bca53af-fdde-443a-99b5-f6856ea259e3",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b block.ecotelecom.ru",
        ]),
      })
    );
    const tag_9bca53f9_b13c_4b36_a551_979d71ff8ce9 = dependencyGuard.apply(
      "tag_9bca53f9_b13c_4b36_a551_979d71ff8ce9",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin([
          "click_pageblock_btn_connect",
        ]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bca53f9-b13c-4b36-a551-979d71ff8ce9",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0430\u0431\u043e\u043d\u0435\u043c\u0435\u043d\u0442 \u043d\u0430 \u0441\u0442\u0440 block.ecotelecom.ru",
        ]),
      })
    );
    const tag_9bd2b3bf_7288_483c_9502_ebeb8928f45d = dependencyGuard.apply(
      "tag_9bd2b3bf_7288_483c_9502_ebeb8928f45d",
      tagTypes.customHTML({
        html: new tagManager.AndataTMJoin([
          "\u003Cscript\u003E\ntry {\n\u00a0\u00a0\u00a0 document.addEventListener('keydown', function (e) {\n\u00a0\u00a0\u00a0\u00a0\u00a0 Array.from(document.querySelectorAll('form.activated-form-promo')).forEach (it =\u003E {\n\u00a0 \u00a0\u00a0\u00a0 it.classList.remove('activated-form-promo');\n\u00a0\u00a0 \u00a0})\n\u00a0 \u00a0\u00a0\u00a0 e.target.closest('form').classList.add('activated-form-promo');\n\u00a0\u00a0 \u00a0})\n} catch (e) {\nconsole.error(\"Add class to active form error\", e);\n}\n\nvar elementBody = document.querySelector('body');\nelementBody.classList.add('promo_page');\n\n\n\n\u003C/script\u003E",
        ]),
        target: null,
        tag_id: new tagManager.AndataTMJoin([
          "9bd2b3bf-7288-483c-9502-ebeb8928f45d",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041f\u0440\u043e\u043c\u043e \u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043a\u043b\u0430\u0441\u0441\u0430 \u0434\u043b\u044f  body \u0438 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0433\u043e \u043a\u043b\u0430\u0441\u0441\u0430 \u0444\u043e\u0440\u043c\u0435",
        ]),
      })
    );
    const tag_9bd2c618_5879_471c_88e0_f4087c4939b5 = dependencyGuard.apply(
      "tag_9bd2c618_5879_471c_88e0_f4087c4939b5",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["promo_click_tel"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: [],
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2c618-5879-471c-88e0-f4087c4939b5",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041f\u0440\u043e\u043c\u043e \u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",
        ]),
      })
    );
    const tag_9bd2c64c_62bc_47f3_b833_240f2b43a797 = dependencyGuard.apply(
      "tag_9bd2c64c_62bc_47f3_b833_240f2b43a797",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["promo_click_tariff"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          tariff_name: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2cd59_1248_4a39_aa86_15b00783ae83,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2c64c-62bc-47f3-b833-240f2b43a797",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041f\u0440\u043e\u043c\u043e \u041a\u043b\u0438\u043a \u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0430\u0440\u0438\u0444",
        ]),
      })
    );
    const tag_9bd2c68e_22db_4ab5_8c63_d75f6f3d7c8b = dependencyGuard.apply(
      "tag_9bd2c68e_22db_4ab5_8c63_d75f6f3d7c8b",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["promo_send_forms"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2c3f0_5576_4517_8459_df1fc7cba380,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_address: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2c59b_21b0_428d_b454_d1155267f17a,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2c68e-22db-4ab5-8c63-d75f6f3d7c8b",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041f\u0440\u043e\u043c\u043e \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435",
        ]),
      })
    );
    const tag_9bd2c7ed_653b_4fcc_927e_946765445f1c = dependencyGuard.apply(
      "tag_9bd2c7ed_653b_4fcc_927e_946765445f1c",
      tagTypes.customHTML({
        html: new tagManager.AndataTMJoin([
          "\u003Cscript\u003E\ntry {\n\u00a0\u00a0\u00a0 document.addEventListener('keydown', function (e) {\n\u00a0\u00a0\u00a0\u00a0\u00a0 Array.from(document.querySelectorAll('form.activated-form-top')).forEach (it =\u003E {\n\u00a0 \u00a0\u00a0\u00a0 it.classList.remove('activated-form-top');\n\u00a0\u00a0 \u00a0})\n\u00a0 \u00a0\u00a0\u00a0 e.target.closest('form').classList.add('activated-form-top');\n\u00a0\u00a0 \u00a0})\n} catch (e) {\nconsole.error(\"Add class to active form error\", e);\n}\n\nvar elementBody = document.querySelector('body');\nelementBody.classList.add('top_page');\n\n\n\n\u003C/script\u003E",
        ]),
        target: null,
        tag_id: new tagManager.AndataTMJoin([
          "9bd2c7ed-653b-4fcc-927e-946765445f1c",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u0422\u043e\u043f \u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043a\u043b\u0430\u0441\u0441\u0430 \u0434\u043b\u044f  body \u0438 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0433\u043e \u043a\u043b\u0430\u0441\u0441\u0430 \u0444\u043e\u0440\u043c\u0435",
        ]),
      })
    );
    const tag_9bd2ca8c_602a_4210_af2b_098cbd4deac1 = dependencyGuard.apply(
      "tag_9bd2ca8c_602a_4210_af2b_098cbd4deac1",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["top_click_tel"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2ca8c-602a-4210-af2b-098cbd4deac1",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u0422\u043e\u043f \u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",
        ]),
      })
    );
    const tag_9bd2cac6_35b1_40fc_96b0_42f868eef960 = dependencyGuard.apply(
      "tag_9bd2cac6_35b1_40fc_96b0_42f868eef960",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["top_click_tariff"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          tariff_name: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2cd8c_3e88_4f5f_b94b_9e5efe4050ef,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2cac6-35b1-40fc-96b0-42f868eef960",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u0422\u043e\u043f \u041a\u043b\u0438\u043a \u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0430\u0440\u0438\u0444",
        ]),
      })
    );
    const tag_9bd2cb19_2992_49ab_8327_808354bb5bac = dependencyGuard.apply(
      "tag_9bd2cb19_2992_49ab_8327_808354bb5bac",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["top_send_forms"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2c980_25c4_42c1_9048_e04eba73d681,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_address: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2c9b8_dc54_4960_be47_0b088d90d8a7,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2cb19-2992-49ab-8327-808354bb5bac",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u0422\u043e\u043f \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435",
        ]),
      })
    );
    const tag_9bd2cfa2_2d4c_4e51_afb5_0cee86ab64f1 = dependencyGuard.apply(
      "tag_9bd2cfa2_2d4c_4e51_afb5_0cee86ab64f1",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["top_click_wa"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2cfa2-2d4c-4e51-afb5-0cee86ab64f1",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u0422\u043e\u043f \u041f\u0435\u0440\u0435\u0445\u043e\u0434 \u0432 whatsapp",
        ]),
      })
    );
    const tag_9bd2d1be_84aa_4000_9b06_d39d957d4b0e = dependencyGuard.apply(
      "tag_9bd2d1be_84aa_4000_9b06_d39d957d4b0e",
      tagTypes.customHTML({
        html: new tagManager.AndataTMJoin([
          "\u003Cscript\u003E\nvar elementBody = document.querySelector('body');\nelementBody.classList.add('hr_page');\n\n\u003C/script\u003E",
        ]),
        target: null,
        tag_id: new tagManager.AndataTMJoin([
          "9bd2d1be-84aa-4000-9b06-d39d957d4b0e",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "HR \u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043a\u043b\u0430\u0441\u0441\u0430 body",
        ]),
      })
    );
    const tag_9bd2d574_eb9e_4598_8d3a_5e7aeed3fb73 = dependencyGuard.apply(
      "tag_9bd2d574_eb9e_4598_8d3a_5e7aeed3fb73",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["hr_click_tel"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2d574-eb9e-4598-8d3a-5e7aeed3fb73",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "HR \u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",
        ]),
      })
    );
    const tag_9bd2d59d_25d6_47fd_8ad0_9788d57d1ed3 = dependencyGuard.apply(
      "tag_9bd2d59d_25d6_47fd_8ad0_9788d57d1ed3",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["hr_click_email"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2d59d-25d6-47fd-8ad0-9788d57d1ed3",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "HR \u041a\u043b\u0438\u043a \u043f\u043e \u043f\u043e\u0447\u0442\u0435",
        ]),
      })
    );
    const tag_9bd2d628_c2ee_4fc9_bc0b_4de69bb82a33 = dependencyGuard.apply(
      "tag_9bd2d628_c2ee_4fc9_bc0b_4de69bb82a33",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["hr_send_forms"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: {
          input_phone: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2d31c_c915_4247_87ef_d7ded784d5c0,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_email: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2d464_b17f_4318_9418_369bd831a7bf,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
          input_vacancy: {
            value: {
              value: new tagManager.AndataTMJoin([
                tagManager.vars.var_9bd2d53f_4eb7_445f_aaa6_6bf9dc0cf422,
              ]),
              passport: false,
              type: new tagManager.AndataTMJoin(["string"]),
            },
          },
        },
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2d628-c2ee-4fc9-bc0b-4de69bb82a33",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "HR \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u043f\u0438\u0448\u0438\u0441\u044c \u043d\u0430 \u0441\u043e\u0431\u0435\u0441\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435",
        ]),
      })
    );
    const tag_9bd2d6e2_9c06_4909_8143_efac25aa0e96 = dependencyGuard.apply(
      "tag_9bd2d6e2_9c06_4909_8143_efac25aa0e96",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["page_closed_blocked"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2d6e2-9c06-4909-8143-efac25aa0e96",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b ecotelecom.ru/closed/blocked_default.htm",
        ]),
      })
    );
    const tag_9bd2da49_f100_408f_82f3_c9ce910a0cbe = dependencyGuard.apply(
      "tag_9bd2da49_f100_408f_82f3_c9ce910a0cbe",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["default_click_pay_in_lk"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2da49-f100-408f-82f3-c9ce910a0cbe",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u0412\u043e\u0439\u0442\u0438 \u0438 \u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043d\u0430 \u0441\u0442\u0440 ecotelecom.ru/closed/blocked_default.htm",
        ]),
      })
    );
    const tag_9bd2dbbc_acae_455f_9c76_1d74d5e75e12 = dependencyGuard.apply(
      "tag_9bd2dbbc_acae_455f_9c76_1d74d5e75e12",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin([
          "default_click_connect_subscription",
        ]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2dbbc-acae-455f-9c76-1d74d5e75e12",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0430\u0431\u043e\u043d\u0435\u043c\u0435\u043d\u0442 \u043d\u0430 \u0441\u0442\u0440 ecotelecom.ru/closed/blocked_default.htm",
        ]),
      })
    );
    const tag_9bd2dfb0_25ef_43ac_bddf_8eec467766bd = dependencyGuard.apply(
      "tag_9bd2dfb0_25ef_43ac_bddf_8eec467766bd",
      tagTypes.andataEvent({
        event_name: new tagManager.AndataTMJoin(["promo_page_thankyou"]),
        atm_json_schema: null,
        container_id: new tagManager.AndataTMJoin([
          "9b91d137-d2ac-4f60-8303-e5be7e7bbb96",
        ]),
        event_data: null,
        conversion: null,
        adv_id: null,
        sent_to_ym: null,
        sent_to_ym_backend: null,
        sent_to_ym_target: null,
        sent_to_ga: null,
        sales_tunnel_level: null,
        conversion_amount: null,
        conversion_currency: null,
        json_schema: new tagManager.AndataTMJoin([
          "iglu:ekotelekom_zisej/ekotelekom_zisej_container_9b91d137-d2ac-4f60-8303-e5be7e7bbb96/jsonschema/1-0-0",
        ]),
        tag_id: new tagManager.AndataTMJoin([
          "9bd2dfb0-25ef-43ac-bddf-8eec467766bd",
        ]),
        tag_name: new tagManager.AndataTMJoin([
          "\u041f\u0440\u043e\u043c\u043e \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0421\u043f\u0430\u0441\u0438\u0431\u043e",
        ]),
      })
    );

    /* Triggers */
    triggerTypes.ATMLoad({ name: "ATMLoaded" })(
      tag_9b91d138_9933_4d02_9553_60f1dd7cbc44
    );
    triggerTypes.click({
      selector: 'a[href="tel:+74995055555"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: 'a[href="tel:+74995055555"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430",
    })(tag_9bac25a7_3110_4f65_8528_aefe6ffaff01);
    triggerTypes.click({
      selector: 'a[href*="https://t.me"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e telegram",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: 'a[href*="https://t.me"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e telegram",
    })(tag_9bac25d6_e8d5_450a_92ab_8175239a3853);
    triggerTypes.click({
      selector: 'a[href*="https://vk.com"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u0412\u041a",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: 'a[href*="https://vk.com"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u0412\u041a",
    })(tag_9bac261c_cbb2_4f9d_8837_5fdac200ee4c);
    triggerTypes.click({
      selector: 'a[href*="/about/promo/"]',
      name: "\u041a\u043b\u0438\u043a \u0410\u043a\u0446\u0438\u0438",
    })(tag_9bac2649_ce3e_4f62_baf3_75b6e7e5e40d);
    triggerTypes.click({
      selector: 'a[href*="/about/promo/"]',
      name: "\u041a\u043b\u0438\u043a \u0410\u043a\u0446\u0438\u0438",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: "body > div.app > header > div > div.header__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f \u0432 \u0445\u044d\u0434\u0435\u0440\u0435",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: "body > div.app > header > div > div.header__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f \u0432 \u0445\u044d\u0434\u0435\u0440\u0435",
    })(tag_9bac26e3_5329_4364_8ad3_1017cef17220);
    triggerTypes.click({
      selector: "form.filter__form button.filter__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c \u0430\u0434\u0440\u0435\u0441",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: "form.filter__form button.filter__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c \u0430\u0434\u0440\u0435\u0441",
    })(tag_9bac3459_0da7_4dc3_9926_ea76173f9740);
    triggerTypes.click({
      selector:
        "section.choose-tariff div.choose-tariff_buttons button.scrollable-buttons_button",
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u0442\u0430\u0440\u0438\u0444\u043d\u043e\u043c\u0443 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044e",
    })(tag_9bac3497_616b_4c08_a65c_ab22b94dde1a);
    triggerTypes.click({
      selector:
        "section.choose-tariff div.choose-tariff_buttons button.scrollable-buttons_button",
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u0442\u0430\u0440\u0438\u0444\u043d\u043e\u043c\u0443 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044e",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: "section.choose-tariff div.choose-tariff_item-wrapper button",
      name: "\u041a\u043b\u0438\u043a \u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0430\u0440\u0438\u0444",
    })(tag_9bac3526_0b5e_4fa9_9e98_2cbd10d621a4);
    triggerTypes.click({
      selector: "section.choose-tariff div.choose-tariff_item-wrapper button",
      name: "\u041a\u043b\u0438\u043a \u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0430\u0440\u0438\u0444",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_4"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b (4)",
    })(tag_9bac41ab_3bca_43e2_be8b_076e95973983);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_4"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b (4)",
    })(tag_9bac3d20_ab50_4503_850d_0b4872e52cf4);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_7"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 (7)",
    })(tag_9bac41ab_3bca_43e2_be8b_076e95973983);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_7"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 (7)",
    })(tag_9bac3798_7aeb_4cf5_aa8d_3faee92bbe9f);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_1"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b popup (1)",
    })(tag_9bac41ab_3bca_43e2_be8b_076e95973983);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_1"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b popup (1)",
    })(tag_9bac3b8a_0898_424a_aa60_a87ba98c6ac2);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_2"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b popup (2)",
    })(tag_9bac3b8a_0898_424a_aa60_a87ba98c6ac2);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_2"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b popup (2)",
    })(tag_9bac41ab_3bca_43e2_be8b_076e95973983);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_6"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b popup \u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435 (6)",
    })(tag_9bac3de0_2f90_491c_b759_969b46ef5b65);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_6"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b popup \u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435 (6)",
    })(tag_9bac41ab_3bca_43e2_be8b_076e95973983);
    triggerTypes.click({
      selector: 'a[href*="https://my.ecotelecom.ru"]',
      name: "\u041f\u0435\u0440\u0435\u0445\u043e\u0434 \u0432 \u041b\u041a",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: 'a[href*="https://my.ecotelecom.ru"]',
      name: "\u041f\u0435\u0440\u0435\u0445\u043e\u0434 \u0432 \u041b\u041a",
    })(tag_9bac360f_d6fd_482a_a180_ef1643e84164);
    triggerTypes.click({
      selector:
        "section.sections__item div.summary__container button.summary__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c (\u0422\u0435\u043b\u0435\u0444\u043e\u043d\u0438\u044f)",
    })(tag_9bac26e3_5329_4364_8ad3_1017cef17220);
    triggerTypes.click({
      selector:
        "section.sections__item div.summary__container button.summary__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c (\u0422\u0435\u043b\u0435\u0444\u043e\u043d\u0438\u044f)",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: "div.connect__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: "div.connect__button",
      name: "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c",
    })(tag_9bac26e3_5329_4364_8ad3_1017cef17220);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_5"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u041e\u0431\u0440\u0430\u0442\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c (5)",
    })(tag_9bac41ab_3bca_43e2_be8b_076e95973983);
    triggerTypes.submitForm({
      selector: 'form[name="SIMPLE_FORM_5"]',
      name: "\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u041e\u0431\u0440\u0430\u0442\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c (5)",
    })(tag_9bac4058_f3c8_4f5c_bbb3_dfe9fb9a4e3f);
    triggerTypes.click({
      selector: 'a[href*="/subscribes/equpment/"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: 'a[href*="/subscribes/equpment/"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435",
    })(tag_9bac5cfb_cd45_4140_ad52_1808034d1f9f);
    triggerTypes.click({
      selector: 'a[href*="/cgi-bin/pay.php"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: 'a[href*="/cgi-bin/pay.php"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c",
    })(tag_9bac5f7c_2491_4670_9878_17e3c69bc4dd);
    triggerTypes.click({
      selector: 'a[href*="/cgi-bin/lk.php"]',
      name: "\u041a\u043b\u0438\u043a \u041b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442",
    })(tag_9bac360f_d6fd_482a_a180_ef1643e84164);
    triggerTypes.click({
      selector: 'a[href*="/cgi-bin/lk.php"]',
      name: "\u041a\u043b\u0438\u043a \u041b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.click({
      selector: 'a[href="tel:+74995055577"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c",
    })(tag_9badae69_9bfd_47e7_8c50_760664326c97);
    triggerTypes.click({
      selector: 'a[href="tel:+74995055577"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c",
    })(tag_9bac5d66_70ae_4039_ab86_6f95676d8ec3);
    triggerTypes.pageView({
      delay: 0,
      pageURL: "http://block.ecotelecom.ru",
      strict: false,
      regexp: false,
      name: "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b block.ecotelecom.ru",
    })(tag_9bca53af_fdde_443a_99b5_f6856ea259e3);
    triggerTypes.mousedown({
      selector: 'a[href*="https://my.ecotelecom.ru/#services/subscription"]',
      name: "\u041a\u043b\u0438\u043a \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0430\u0431\u043e\u043d\u0435\u043c\u0435\u043d\u0442 \u043d\u0430 \u0441\u0442\u0440 block.ecotelecom.ru",
    })(tag_9bca53f9_b13c_4b36_a551_979d71ff8ce9);
    triggerTypes.pageView({
      delay: 0,
      pageURL: "https://promo.ecotelecom.ru",
      strict: false,
      regexp: false,
      name: "\u041f\u0440\u043e\u043c\u043e \u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b promo.ecotelecom.ru",
    })(tag_9bd2b3bf_7288_483c_9502_ebeb8928f45d);
    triggerTypes.click({
      selector: 'body.promo_page a[href*="tel:"]',
      name: "\u041f\u0440\u043e\u043c\u043e \u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",
    })(tag_9bd2c618_5879_471c_88e0_f4087c4939b5);
    triggerTypes.click({
      selector: "body.promo_page button.choose-btn",
      name: "\u041f\u0440\u043e\u043c\u043e \u041a\u043b\u0438\u043a \u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0430\u0440\u0438\u0444",
    })(tag_9bd2c64c_62bc_47f3_b833_240f2b43a797);
    triggerTypes.click({
      selector: 'body.promo_page #form2 button[type*="submit"]',
      name: "\u041f\u0440\u043e\u043c\u043e \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 popup",
    })(tag_9bd2c68e_22db_4ab5_8c63_d75f6f3d7c8b);
    triggerTypes.click({
      selector: "body.promo_page #form1 button[type*=submit]",
      name: "\u041f\u0440\u043e\u043c\u043e \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u0438\u043a\u0430",
    })(tag_9bd2c68e_22db_4ab5_8c63_d75f6f3d7c8b);
    triggerTypes.pageView({
      delay: 0,
      pageURL: "https://top.ecotelecom.ru",
      strict: false,
      regexp: false,
      name: "\u0422\u043e\u043f \u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b top.ecotelecom.ru",
    })(tag_9bd2c7ed_653b_4fcc_927e_946765445f1c);
    triggerTypes.click({
      selector: 'body.top_page a[href*="tel:"]',
      name: "\u0422\u043e\u043f \u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",
    })(tag_9bd2ca8c_602a_4210_af2b_098cbd4deac1);
    triggerTypes.click({
      selector: "body.top_page button.choose-btn",
      name: "\u0422\u043e\u043f \u041a\u043b\u0438\u043a \u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0430\u0440\u0438\u0444",
    })(tag_9bd2cac6_35b1_40fc_96b0_42f868eef960);
    triggerTypes.click({
      selector: 'body.top_page #form2 button[type*="submit"]',
      name: "\u0422\u043e\u043f \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 popup",
    })(tag_9bd2cb19_2992_49ab_8327_808354bb5bac);
    triggerTypes.click({
      selector: 'body.top_page #form1 button[type*="submit"]',
      name: "\u0422\u043e\u043f \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u0438\u043a\u0430",
    })(tag_9bd2cb19_2992_49ab_8327_808354bb5bac);
    triggerTypes.click({
      selector: 'body.top_page a[href*="https://api.whatsapp.com"]',
      name: "\u0422\u043e\u043f \u041f\u0435\u0440\u0435\u0445\u043e\u0434 \u0432 whatsapp",
    })(tag_9bd2cfa2_2d4c_4e51_afb5_0cee86ab64f1);
    triggerTypes.pageView({
      delay: 0,
      pageURL: "https://hr.ecotelecom.ru",
      strict: false,
      regexp: false,
      name: "HR \u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b hr.ecotelecom.ru",
    })(tag_9bd2d1be_84aa_4000_9b06_d39d957d4b0e);
    triggerTypes.click({
      selector: 'body.hr_page a[href*="tel:"]',
      name: "HR \u041a\u043b\u0438\u043a \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",
    })(tag_9bd2d574_eb9e_4598_8d3a_5e7aeed3fb73);
    triggerTypes.click({
      selector: 'a[href="mailto:ecotelecom.career@gmail.com"]',
      name: "HR \u041a\u043b\u0438\u043a \u043f\u043e \u043f\u043e\u0447\u0442\u0435",
    })(tag_9bd2d59d_25d6_47fd_8ad0_9788d57d1ed3);
    triggerTypes.submitForm({
      selector: "body.hr_page #my-form",
      name: "HR \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u043e\u0440\u043c\u044b \u0417\u0430\u043f\u0438\u0448\u0438\u0441\u044c \u043d\u0430 \u0441\u043e\u0431\u0435\u0441\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435",
    })(tag_9bd2d628_c2ee_4fc9_bc0b_4de69bb82a33);
    triggerTypes.pageView({
      delay: 0,
      pageURL: "https://www.ecotelecom.ru/closed/blocked_default.htm",
      strict: false,
      regexp: false,
      name: "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b ecotelecom.ru/closed/blocked_default.htm",
    })(tag_9bd2d6e2_9c06_4909_8143_efac25aa0e96);
    triggerTypes.click({
      selector:
        '#main > div > header > p > a[href="https://my.ecotelecom.ru/"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u0412\u043e\u0439\u0442\u0438 \u0438 \u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043d\u0430 \u0441\u0442\u0440 ecotelecom.ru/closed/blocked_default.htm",
    })(tag_9bd2da49_f100_408f_82f3_c9ce910a0cbe);
    triggerTypes.click({
      selector:
        '#main > div.inner > a[href="https://my.ecotelecom.ru/#services/subscription"]',
      name: "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0430\u0431\u043e\u043d\u0435\u043c\u0435\u043d\u0442 \u043d\u0430 \u0441\u0442\u0440 ecotelecom.ru/closed/blocked_default.htm",
    })(tag_9bd2dbbc_acae_455f_9c76_1d74d5e75e12);
    triggerTypes.pageView({
      delay: 0,
      pageURL: "https://promo.ecotelecom.ru/php/thank_you.html",
      strict: false,
      regexp: false,
      name: "\u041f\u0440\u043e\u043c\u043e \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0421\u043f\u0430\u0441\u0438\u0431\u043e",
    })(tag_9bd2dfb0_25ef_43ac_bddf_8eec467766bd);
  })(); /* Andata Data Layer */
  (function (w, l = "dataLayer") {
    let hasKey = (object, type, key) =>
      typeof object === type && object.hasOwnProperty(key);
    if (!hasKey(w, "object", l)) {
      w[l] = [];
    }
    let dataLayer = w[l];
    const alreadyInit = dataLayer.hasOwnProperty("_atag_push");
    if ("push" in dataLayer && !alreadyInit) {
      dataLayer._atag_push = dataLayer.push;
    }

    dataLayer.runLoaded = function () {
      console.log("RUN parsing exist events in DataLayer", dataLayer);
      dataLayer.forEach((item) => {
        if (hasKey(item, "object", "event")) {
          console.log("RUN", item.event);
          document.dispatchEvent(new CustomEvent(item.event));
        }
      });
    };

    dataLayer.runLoaded();

    dataLayer.push = function (...args) {
      //log("ADL push:",args);
      let self = this;
      let runObject = function (item) {
        if (hasKey(item, "object", "event")) {
          document.dispatchEvent(new CustomEvent(item.event));
        }
      };
      let runFunction = function (item) {
        const gs = {
          get: function (key) {
            let result = null;
            self.forEach((it) => {
              if (hasKey(it, "object", key)) {
                result = it[key];
              } else if (
                hasKey(it, "function", "adl") &&
                hasKey(it.adl, "object", key)
              ) {
                result = it.adl[key];
              }
            });
            return result;
          },
          set: function (key, value) {
            if (!hasKey(item, "function", "adl")) {
              item.adl = {};
            }
            item.adl[key] = value;
          },
        };
        item.call(gs);
      };

      this._atag_push(...args);
      args.forEach((it) => {
        switch (typeof it) {
          case "object":
            runObject(it);
            break;
          case "function":
            runFunction(it);
            break;
        }
      });
    };
  })(window, "dataLayer");
} catch (e) {
  logException(e);
}
