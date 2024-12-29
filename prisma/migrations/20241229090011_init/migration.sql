-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_attendeeId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
