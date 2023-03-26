import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarkDto, EditBookmarkDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({ where: { userId: userId } });
  }

  createBookmark(userId: number, dto: BookmarkDto) {
    const bookmark = { ...dto, userId: userId };
    return this.prisma.bookmark.create({ data: { ...bookmark } });
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: { userId: userId, id: bookmarkId },
      });
      if (!bookmark) throw new NotFoundException(' Bookmark not found');
      return bookmark;
    } catch (e) {
      throw e;
    }
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: { userId: userId, id: bookmarkId },
      });
      if (!bookmark) {
        throw new NotFoundException(' Bookmark not found');
      }

      return this.prisma.bookmark.update({
        where: { id: bookmarkId },
        data: { ...dto },
      });
    } catch (e) {
      throw e;
    }
  }

  deleteBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark = this.prisma.bookmark.findFirst({
        where: { userId: userId, id: bookmarkId },
      });
      if (bookmark === undefined) {
        throw new NotFoundException(' Bookmark not found');
      }

      return this.prisma.bookmark.delete({ where: { id: bookmarkId } });
    } catch (e) {
      throw e;
    }
  }
}
