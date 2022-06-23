class Body {
    constructor(text = "") {
        this.init(text);
    }

    init(text = "") {
        this.text = text;
        this.bodyParts = [];

        this.setDifferentBodyParts();
    }

    reload() {
        this.init(this.text);
    }

    setDifferent(otherBody) {
        this.bodyParts = [];
        this.setDifferentBodyParts(otherBody.text);
    }

    isEmpty() {
        return this.text == "";
    }

    equals(body) {
        if (body == null ||
            body.isEmpty()) {
            return false;
        }

        return this.text === body.text &&
            this.bodyParts.length === body.bodyParts.length &&
            this.bodyParts.every(currentBodyPart => {
                return body.bodyParts.some(otherBodyPart => {
                    return currentBodyPart.equals(otherBodyPart);
                })
            });
    }

    setDifferentBodyParts(otherBodyText = "") {
        const TABS_AND_SPACES_REGEX = /([\n\s\b]+)/;
        var bodyArray = this.text.split(TABS_AND_SPACES_REGEX);
        var otherBodyArray = otherBodyText.split(TABS_AND_SPACES_REGEX);
        var isOtherBodyEmpty = otherBodyText === "";

        var bodyParts = bodyArray
            .map(word => {
                if (isOtherBodyEmpty) {
                    return new BodyPart(word, BodyPartStatus.NotChanged);
                }
                else if (otherBodyArray.indexOf(word) !== -1) {
                    return new BodyPart(word, BodyPartStatus.NotChanged);
                }
                else {
                    return new BodyPart(word, BodyPartStatus.Changed);
                }
            });

        bodyParts.forEach(bodyPart => {
                if (this.bodyParts.length === 0) {
                    this.bodyParts.push(bodyPart);
                    return;
                }

                var previewDiffBodyPart = this.bodyParts[this.bodyParts.length - 1];
                if (previewDiffBodyPart.status === bodyPart.status) {
                    previewDiffBodyPart.value += bodyPart.value;
                }
                else {
                    this.bodyParts.push(bodyPart);
                }
            });
    }
}